import {Vue, Component} from 'vue-property-decorator'
// @ts-ignore
import RightTipDisplay from '@/components/RightTipDisplay/RightTipDisplay.vue'
// @ts-ignore
import ImportMnemonic from '@/components/ImportMnemonic/ImportMnemonic.vue'

@Component({
  components: {
    RightTipDisplay,
    ImportMnemonic,
  },
})
export default class ImportMnemonicTs extends Vue {
  tipContents: string[] = [
    '助记词遵循 HD WALLET 协议的种子文件，由12/24个随机单词组成，导入文本后，将会能操作该种子下的所有资产.',
    '此文本被加密保存于你本地电脑，请注意备份和网络安全.',
  ]
}
