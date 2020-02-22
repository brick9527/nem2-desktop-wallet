import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class ImportMnemonicTs extends Vue {
  @Prop()


  mnemonicType: string = '1'
}
