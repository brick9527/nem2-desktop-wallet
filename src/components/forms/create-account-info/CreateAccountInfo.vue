<template>
  <div class="create-account-sec" @keyup.enter="submit()">
    <p class="set-title">
      {{ $t('Create_an_account_and_password') }}
    </p>
    <p class="set-title-tips">
      {{ $t('Set_title_tips') }}
    </p>
    <div class="create-account-col">
      <div class="create-account-left">
        <div class="form-input-item">
          <div>* {{ $t('Set_account_name') }}</div>
          <ErrorTooltip field-name="newAccountName">
            <input
              v-model="formItem.accountName"
              v-validate="validation.newAccountName"
              v-focus
              data-vv-name="newAccountName"
              :data-vv-as="$t('newAccountName')"
              :placeholder="$t('account_name')"
            >
          </ErrorTooltip>
        </div>
        <div class="form-input-item">
          <div>* {{ $t('Set_network_type') }}</div>
          <Select v-model="currentNetworkType" :placeholder="$t('choose_network')" required>
            <Option v-for="(item,index) in networkTypeList" :key="index" :value="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="form-input-item">
          <div>* {{ $t('Set_password') }}</div>
          <ErrorTooltip field-name="password">
            <input
              v-model.lazy="formItem.password"
              v-focus
              v-validate="validation.password"
              data-vv-name="password"
              :data-vv-as="$t('password')"
              :placeholder="$t('please_enter_your_wallet_password')"
              type="password"
            >
          </ErrorTooltip>
        </div>
        <div class="form-input-item">
          <div>* {{ $t('Confirm_password') }}</div>
          <ErrorTooltip field-name="confirmPassword">
            <input
              v-model.lazy="formItem.passwordAgain"
              v-focus
              v-validate="validation.confirmPassword"
              data-vv-name="confirmPassword"
              :data-vv-as="$t('password')"
              :placeholder="$t('please_enter_your_wallet_password')"
              type="password"
            >
          </ErrorTooltip>
          <input
            v-show="false" v-model="formItem.password" v-validate
            disabled data-vv-name="newPassword"
          >
        </div>
        <div class="form-input-item">
          <div>* {{ $t('Password_hint') }}</div>
          <input v-model="formItem.hint">
        </div>
        <div class="button-container">
          <button class="info-button" @click="$router.push('login')">
            {{ $t('Back_to_home') }}
          </button>
          <button @click="submit">
            {{ $t(nextPage === 'importMnemonic' ? 'Restore_Mnemonic' : 'Generating_mnemonic') }}
          </button>
        </div>
      </div>
      <div class="create-account-right">
        <p class="text1">
          {{ $t('Account_description') }}
        </p>
        <p class=" text">
          {{ $t('Account_description_tips1') }}
        </p>
        <p class=" text">
          {{ $t('Account_description_tips2') }}
        </p>
        <p class="text red">
          {{ $t('Account_description_tips3') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {CreateAccountInfoTs} from './CreateAccountInfoTs'
import './CreateAccountInfo.less'

export default class CreateAccountInfo extends CreateAccountInfoTs {
}
</script>

<style scoped>
</style>
