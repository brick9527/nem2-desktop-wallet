<template>
  <div class="import-way-back-wrapper">
    <span class="import-back-button" @click="$emit('backToLogin')">
      <Icon type="ios-arrow-back" />
      {{ $t(backContent) }}
    </span>
    <span class="import-way-welcome">{{ $t(welcomeContent) }}</span>
  </div>
</template>

<script lang="ts">
import {ImportWayBackHeadTs} from './ImportWayBackHeadTs'
import './ImportWayBackHead.less'
export default class ImportWayBackHead extends ImportWayBackHeadTs {}
</script>
