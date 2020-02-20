<template>
  <div>
    <FormWrapper class="password-settings-container">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="form-container mt-3"
          onsubmit="event.preventDefault()"
          @keyup.enter="handleSubmit(onSubmit)" autocomplete="off"
        >
          <div class="form-row">
            <div class="label">
              <FormLabel>{{ $t('form_label_old_password') }}</FormLabel>
            </div>
            <div class="value">
              <ValidationProvider
                v-slot="{ errors }"
                vid="newPassword"
                mode="lazy"
                :name="$t('password')"
                :rules="validationRules.password"
                tag="div"
                class="inline-container"
              >
                <ErrorTooltip :errors="errors">
                  <div class="full-width-item-container">
                    <input
                      ref="passwordInput"
                      v-model="formItems.oldPassword"
                      class="full-width-item-container input-size input-style"
                      type="password"
                    >
                  </div>
                </ErrorTooltip>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-row">
            <div class="label">
              <FormLabel>{{ $t('form_label_new_password') }}</FormLabel>
            </div>
            <div class="value">
              <ValidationProvider
                v-slot="{ errors }"
                vid="newPassword"
                mode="lazy"
                :name="$t('password')"
                :rules="validationRules.password"
                tag="div"
                class="inline-container"
              >
                <ErrorTooltip :errors="errors">
                  <div class="full-width-item-container">
                    <input
                      ref="passwordInput"
                      v-model="formItems.password"
                      class="full-width-item-container input-size input-style"
                      :placeholder="$t('form_label_new_password_placeholder')"
                      type="password"
                    >
                  </div>
                </ErrorTooltip>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-row">
            <div class="label">
              <FormLabel>{{ $t('form_label_new_password_confirm') }}</FormLabel>
            </div>
            <div class="value">
              <ValidationProvider
                v-slot="{ errors }"
                vid="confirmPassword"
                :name="$t('confirmPassword')"
                :rules="validationRules.confirmPassword"
                tag="div"
                class="inline-container"
              >
                <ErrorTooltip :errors="errors">
                  <div class="full-width-item-container">
                    <input
                      v-model="formItems.passwordConfirm"
                      class="full-width-item-container input-size input-style"
                      data-vv-name="confirmPassword"
                      :placeholder="$t('form_label_new_password_confirm')"
                      type="password"
                    >
                  </div>
                </ErrorTooltip>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-row">
            <div class="label">
              <FormLabel>{{ $t('form_label_new_password_hint') }}</FormLabel>
            </div>
            <div class="value">
              <ValidationProvider
                v-slot="{ errors }"
                vid="hint"
                :name="$t('hint')"
                :rules="validationRules.message"
                tag="div"
                class="inline-container"
              >
                <ErrorTooltip :errors="errors">
                  <div class="full-width-item-container">
                    <input
                      v-model="formItems.passwordHint"
                      class="full-width-item-container input-size input-style"
                      :placeholder="$t('form_label_new_password_hint_placeholder')"
                    >
                  </div>
                </ErrorTooltip>
              </ValidationProvider>
            </div>
          </div>
          <button
            class="btn button-style  
          validation-button right-side-button"
            type="submit" @click="handleSubmi(onSubmit)">
            {{ $t('confirm_update') }}
          </button>
        </form>
      </ValidationObserver>
    </FormWrapper>

    <ModalFormAccountUnlock
      v-if="hasAccountUnlockModal"
      :visible="hasAccountUnlockModal"
      :on-success="onAccountUnlocked"
      @close="hasAccountUnlockModal = false"
    />
  </div>
</template>

<script lang="ts">
import { FormAccountPasswordUpdateTs } from './FormAccountPasswordUpdateTs'
export default class FormAccountPasswordUpdate extends FormAccountPasswordUpdateTs {}
</script>

<style lang="less" scoped>
@import "../../../views/resources/css/variables.less";
.password-settings-container {
  display: block;
  width: 100%;
  clear: both;
  .form-row {
    width: 100%;
    display: flex;
  }
  .label {
    display: inline-block;
    text-align: right;
    font-size: @normalFont;
    width: 100%;
    margin-right: 25px;
    margin-top: 10px;
  }
  .value {
    float: left;
    font-size: @smallerFont;
    font-weight: bolder;
  }
  .btn {
    float:right;
  }
}
</style>

