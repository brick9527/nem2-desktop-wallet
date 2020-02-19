<template>
  <div class="explorer-url-setter-container">
    <div class="label">
      <FormLabel>{{ $t('set_explorer_link') }}</FormLabel>
    </div>
    <div class="value">
      <ValidationProvider
        v-slot="{ errors }"
        mode="lazy"
        vid="explorerUrl"
        :name="$t('Explorer_Url')"
        :rules="validationRules.url"
        tag="div"
        class="full-width-item-container"
      >
        <ErrorTooltip :errors="errors">
          <AutoComplete
            v-model="chosenExplorerUrl"
            :placeholder="$t('node')"
            :data="defaultExplorerLinkList"
            class="auto-complete-size auto-complete-style"
          />
        </ErrorTooltip>
      </ValidationProvider>
    </div>
  </div>
</template>

<script>
import {ExplorerUrlSetterTs} from './ExplorerUrlSetterTs'
import './ExplorerUrlSetter.less'
export default class ExplorerUrlSetter extends ExplorerUrlSetterTs {}
</script>
