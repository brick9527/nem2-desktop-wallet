<template>
  <div class="import-page-wrapper">
    <div class="step-box-container">
      <StepBar :step-list="stepList" :current-step="parseInt($route.meta.title, 10)" />
    </div>
    <div class="page-detail-container">
      <div class="page-content-title">
        验证备份的助记词
      </div>
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

