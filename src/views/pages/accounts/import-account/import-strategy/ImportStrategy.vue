<template>
  <div class="import-way-wrapper radius">
    <ImportWayBackHead
      :back-content="'back'" :welcome-content="'welcome_to_symbol_world'"
      @backToLogin="$router.push('/login')"
    />

    <div class="import-way-inner-panel">
      <ImportWayItem
        v-for="(item,index) in importInfoList"
        :key="index"
        :img-src="item.image"
        :item-title="item.title"
        :item-description="item.description"
        :item-route="item.route"
        @submitClick="redirect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ImportStrategyTs from './ImportStrategyTs'
import './ImportStrategy.less'

export default class ImportStrategy extends ImportStrategyTs {}
</script>
