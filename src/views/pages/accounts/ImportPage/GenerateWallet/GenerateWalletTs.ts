import {Vue, Component} from 'vue-property-decorator'
// @ts-ignore
import SelectAccountTable from '@/components/SelectAccountTable/SelectAccountTable.vue'
// @ts-ignore
import TableTitle from '@/components/TableTitle/TableTitle.vue'
import {NetworkType, Address, Password, MosaicId, SimpleWallet} from 'nem2-sdk'
import { DerivationPathLevels, DerivationService } from '@/services/DerivationService'
import { MosaicService } from '@/services/MosaicService'
import { WalletService } from '@/services/WalletService'
import { AccountsRepository } from '@/repositories/AccountsRepository'
import { WalletsRepository } from '@/repositories/WalletsRepository'
import { MnemonicPassPhrase } from 'nem2-hd-wallets'
import { AccountsModel } from '@/core/database/entities/AccountsModel'
import { NotificationType } from '@/core/utils/NotificationType'
import { WalletsModel, WalletType } from '@/core/database/entities/WalletsModel'
// @ts-ignore
import ButtonStep from '@/components/ButtonStep/ButtonStep.vue'


type NetworkNodeEntry = {value: NetworkType, label: string}

@Component({
  components: {
    SelectAccountTable,
    TableTitle,
    ButtonStep,
  },
})
export default class GenerateWalletTs extends Vue {
  /**
   * Currently active account
   * @see {Store.Account}
   * @var {string}
   */
  public currentAccount: AccountsModel

  /**
   * Temporary stored mnemonic pass phrase
   * @see {Store.Temporary}
   * @var {MnemonicPassPhrase}
   */
  public currentMnemonic: MnemonicPassPhrase

  /**
   * Temporary stored password
   * @see {Store.Temporary}
   * @var {Password}
   */
  public currentPassword: Password

  /**
   * Wallet Service
   * @var {WalletService}
   */
  public walletService: WalletService

  /**
   * Mosaic Service
   * @var {MosaicService}
   */
  public mosaicService: MosaicService

  /**
   * Wallets Repository
   * @var {WalletsRepository}
   */
  public walletsRepository: WalletsRepository

  /**
   * Accounts Repository
   * @var {AccountsRepository}
   */
  public accountsRepository: AccountsRepository

  /**
   * Wallet Service
   * @var {DerivationService}
   */
  public derivation: DerivationService

  /**
   * List of addresses
   * @var {Address[]}
   */
  public addressesList: Address[] = []

  /**
   * Network's currency mosaic id
   * @see {Store.Mosaic}
   * @var {MosaicId}
   */
  public networkMosaic: MosaicId
  
  /**
   * Balances map
   * @var {any}
   */
  public addressMosaicMap = {}

  /**
   * Currently active networkType
   * @see {Store.Network}
   * @var {NetworkType}
   */
  public networkType: NetworkType = NetworkType.TEST_NET
  
  /**
   * Network types
   * @var {NetworkNodeEntry[]}
   */
  public networkTypeList: NetworkNodeEntry[] = [
    {value: NetworkType.MIJIN_TEST, label: 'MIJIN_TEST'},
    {value: NetworkType.MAIN_NET, label: 'MAIN_NET'},
    {value: NetworkType.TEST_NET, label: 'TEST_NET'},
    {value: NetworkType.MIJIN, label: 'MIJIN'},
  ]

  /**
   * Map of selected wallets
   * @var {number[]}
   */
  public selectedWallets: number[] = []

  get walletList() {
    const wallets = []
    this.addressesList.map((item, index) => {
      wallets.push({
        address: item.toDTO().address,
        networkType: item.toDTO().networkType,
        path: `m/44'/43'/0'/0'/${index}'`,
        assets: '0',
        choices: false,
        index,
      })
    })
    return wallets
  }

  async mounted() {
    this.derivation = new DerivationService(this.$store)
    this.walletService = new WalletService(this.$store)
    this.mosaicService = new MosaicService(this.$store)
    this.walletsRepository = new WalletsRepository()
    this.accountsRepository = new AccountsRepository()

    Vue.nextTick().then(() => {
      setTimeout(() => this.initAccounts(), 200)
    })
  }

  /**
   * Fetch account balances and map to address
   * @return {void}
   */
  private async initAccounts() {
    // - generate addresses
    this.generaterAddress( NetworkType.TEST_NET,10)
    // fetch accounts info
    const accountsInfo = await this.$store.dispatch('wallet/REST_FETCH_INFOS',this.addressesList)
    if (!accountsInfo) return
    // map balances
    this.addressMosaicMap = this.mosaicService.mapBalanceByAddress(
      accountsInfo,
      this.networkMosaic,
    )
  }

  public generaterAddress(networkType: NetworkType,addressNum: number){
    this.addressesList = this.walletService.getAddressesFromMnemonic(
      new MnemonicPassPhrase(this.currentMnemonic.plain),
      networkType,
      WalletService.DEFAULT_WALLET_PATH,
      addressNum,
    )
  }

  public submit() {
    if (!this.selectedWallets.length) {
      return this.$store.dispatch(
        'notification/ADD_ERROR',
        NotificationType.INPUT_EMPTY_ERROR,
      )
    }
    try {
      // create wallet models
      const wallets = this.createWalletsFromPathIndexes(this.selectedWallets)
      
      // save newly created wallets
      wallets.forEach((wallet, index) => {
        // Store wallets using repository
        this.walletsRepository.create(wallet.values)
        // set current wallet
        if (index === 0) this.$store.dispatch('wallet/SET_CURRENT_WALLET', {model: wallet})
        // add wallets to account
        this.$store.dispatch('account/ADD_WALLET', wallet)
      })

      // get wallets identifiers
      const walletIdentifiers = wallets.map(wallet => wallet.getIdentifier())

      // set known wallets
      this.$store.dispatch('wallet/SET_KNOWN_WALLETS', walletIdentifiers)

      // add wallets to account
      this.currentAccount.values.set('wallets', walletIdentifiers)
      // store account using repository
      this.accountsRepository.update(
        this.currentAccount.getIdentifier(),
        this.currentAccount.values,
      )

      // execute store actions
      this.$store.dispatch('temporary/RESET_STATE')
      this.$store.dispatch('notification/ADD_SUCCESS', NotificationType.OPERATION_SUCCESS)
      return this.$router.push({name: 'accounts.importAccount.finalize'})
    } catch(error) {
      return this.$store.dispatch(
        'notification/ADD_ERROR',
        error,
      )
    }
  }
  /**
   * Create a wallet instance from mnemonic and path
   * @return {WalletsModel}
   */
  private createWalletsFromPathIndexes(indexes: number[]): WalletsModel[] {
    const paths = indexes.map(index =>
      this.derivation.incrementPathLevel(WalletService.DEFAULT_WALLET_PATH,DerivationPathLevels.Account,index))
    const accounts = this.walletService.generateAccountsFromPaths(
      new MnemonicPassPhrase(this.currentMnemonic.plain),
      this.networkType,
      paths,
    )
    const simpleWallets = accounts.map(account =>
      SimpleWallet.createFromPrivateKey('SeedWallet',this.currentPassword,account.privateKey,this.networkType))

    return simpleWallets.map((simpleWallet, i) =>
      new WalletsModel(new Map<string, any>([
        [ 'accountName', this.currentAccount.values.get('accountName') ],
        [ 'name', `Seed Wallet${indexes[i] + 1}` ],
        [ 'type', WalletType.fromDescriptor('Seed') ],
        [ 'address', simpleWallet.address.plain() ],
        [ 'publicKey', accounts[i].publicKey ],
        [ 'encPrivate', simpleWallet.encryptedPrivateKey.encryptedKey ],
        [ 'encIv', simpleWallet.encryptedPrivateKey.iv ],
        [ 'path', paths[i] ],
        [ 'isMultisig', false ],
      ])))
  }

  public updateSelectedList(selectedIndex) {
    this.selectedWallets = selectedIndex
  }
}
