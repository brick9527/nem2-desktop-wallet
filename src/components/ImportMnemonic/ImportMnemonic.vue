<template>
  <div class="import-mnemonic-wrapper">
    <!-- <div class="import-mnemonic-title">
      输入助记词
    </div> -->
    <div class="import-mnemonic-type">
      <RadioGroup v-model="mnemonicType">
        <Radio label="1">
          <span>12位助记词</span>
        </Radio>
        <Radio label="2">
          <span>24位助记词</span>
        </Radio>
      </RadioGroup>
    </div>
    <textarea class="show-mnemonic" />
    <p class="bottom-text">
      助记词HASH码：
      <span>NAN…</span>
    </p>
  </div>
</template>

<script>
import ImportMnemonicTs from './ImportMnemonicTs'
import './ImportMnemonic.less'
export default class ImportMnemonic extends ImportMnemonicTs {}
</script>
