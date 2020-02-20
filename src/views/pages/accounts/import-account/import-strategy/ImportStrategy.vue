<template>
  <div class="import-way-wrapper radius">
    <div class="import-way-back">
      <span class="import-back-button" @click="$router.push('/login')">
        <Icon type="ios-arrow-back" />{{ $t('back') }}
      </span>
      <span class="import-way-welcome">
        {{ $t('welcome_to_symbol_world') }}
      </span>
    </div>

    <div class="import-way-inner-panel">
      <div
        v-for="(item,index) in importInfoList" :key="index" class="account-item"
        @click="redirect(item.route)"
      >
        <div class="img-box">
          <img :src="item.image">
        </div>
        <div class="info-box">
          <p class="access-name">
            {{ $t(item.title) }}
          </p>
          <p class="access-info">
            {{ $t(item.description) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ImportStrategyTs from './ImportStrategyTs'
import './ImportStrategy.less'

export default class ImportStrategy extends ImportStrategyTs {}
</script>
