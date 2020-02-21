<template>
  <div class="import-way-wrapper radius">
    <div class="import-way-inner-panel">
      <div class="welcome-head">
        <p class="title">
          {{ $t('Access_My_Account') }}
        </p>
        <p class="title-tips">
          {{ $t('Do_not_have_Account') }}
          <span
            class="create-account"
            @click="$router.push({name:'accounts.createAccount.info', params:{nextPage:'accounts.createAccount.generateMnemonic'}})"
          >
            {{ $t('create_a_new_account') }}
          </span>
        </p>
      </div>
      <p class="temp-link" @click="$router.push({ name: 'accounts.creation.generateMnemonic' })">
        创建账户-生成助记词
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.creation.backupMnemonic' })">
        创建账户-备份助记词
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.creation.verifyMnemonic' })">
        创建账户-验证助记词
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.creation.accountInfo' })">
        创建账户-账户设置
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.creation.generateWallet' })">
        创建账户-导入钱包
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.import.importMnemonic' })">
        导入账户-导入助记词
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.import.accountInfo' })">
        导入账户-账户设置
      </p>
      <p class="temp-link" @click="$router.push({ name: 'accounts.import.generateWallet' })">
        导入账户-导入钱包
      </p>
      <div class="account-type">
        <div
          v-for="(item,index) in importInfoList" :key="index" class="account-item"
          @click="redirect(item.route)"
        >
          <div class="img-box radius">
            <img :src="item.image">
          </div>
          <p class="access-name">
            {{ $t(item.title) }}
          </p>
          <p class="access-info">
            {{ $t(item.description) }}
          </p>
        </div>
      </div>
      <div class="bottom-text">
        {{ $t('More_Access_Tool_is_working') }}...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ImportStrategyTs from './ImportStrategyTs'
import "./ImportStrategy.less";

export default class ImportStrategy extends ImportStrategyTs {}
</script>

<style lang="less">
.temp-link {
  font-size: 20px;
  color: blue;
}
.temp-link:hover {
  cursor: pointer;
  color: #cccccc;
}
</style>
