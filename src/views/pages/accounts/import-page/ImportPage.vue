<template>
  <div class="import-page-wrapper">
    <div class="step-box-container">
      步骤条容器
    </div>
    <div class="page-detail-container">
      页面详情容器
      <router-view />
    </div>
    <div class="button-container">
      <span>btn1</span>
      <span>btn2</span>
    </div>
  </div>
</template>

<script lang="ts">
import ImportPageTs from './ImportPageTs'
import './ImportPage.less'
export default class ImportPage extends ImportPageTs {}
</script>

