<template>
  <div class="import-way-item-wrapper" @click="$emit('submitClick', itemRoute)">
    <div class="img-box">
      <img :src="imgSrc">
    </div>
    <div class="info-box">
      <p class="access-name">
        {{ $t(itemTitle) }}
      </p>
      <p class="access-info">
        {{ $t(itemDescription) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {ImportWayItemTs} from './ImportWayItemTs'
import './ImportWayItem.less'
export default class ImportWayItem extends ImportWayItemTs {}
</script>
