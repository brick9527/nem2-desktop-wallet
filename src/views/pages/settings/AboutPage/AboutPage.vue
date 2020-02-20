<template>
  <div class="about-container text_select">
    <div class="form-container">
        <div class="subtitle">{{ $t('about_version') }}</div>
      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_app_release') }}</FormLabel>
        </div>
        <div class="value">
          {{ configs.package.description }} v{{ configs.package.version }}
        </div>
      </div>
      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_app_url') }}</FormLabel>
        </div>
        <div class="value">
          <a :href="configs.package.homepage" target="_blank">{{ configs.package.homepage }}</a>
        </div>
      </div>
      <div class="form-row" />

      <div class="subtitle">{{ $t('about_network') }}</div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_default_node') }}</FormLabel>
        </div>
        <div class="value">
          <a :href="getNodeLink()" target="_blank">{{ configs.network.defaultNode.url }}</a>
        </div>
      </div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_network_type') }}</FormLabel>
        </div>
        <div class="value">
          <span v-if="isNetworkType(types.MAIN_NET)">MAINNET</span>
          <span v-else-if="isNetworkType(types.TEST_NET)">TESTNET</span>
          <span v-else-if="isNetworkType(types.MIJIN)">MIJIN</span>
          <span v-else-if="isNetworkType(types.MIJIN_TEST)">MIJIN_TEST</span>
        </div>
      </div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_generation_hash') }}</FormLabel>
        </div>
        <div class="value">{{ configs.network.networks['testnet-publicTest'].generationHash }}</div>
      </div>
      <div class="form-row"></div>

      <div class="subtitle">{{ $t('about_dependencies') }}</div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_sdk_version') }}</FormLabel>
        </div>
        <div class="value">{{ configs.package.dependencies['nem2-sdk'] }}</div>
      </div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_typescript_version') }}</FormLabel>
        </div>
        <div class="value">{{ configs.package.dependencies['typescript'] }}</div>
      </div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_rxjs_version') }}</FormLabel>
        </div>
        <div class="value">{{ configs.package.dependencies['rxjs'] }}</div>
      </div>

      <div class="form-row">
        <div class="label">
          <FormLabel>{{ $t('about_vue_version') }}</FormLabel>
        </div>
        <div class="value">{{ configs.package.dependencies['vue'] }}</div>
      </div>
      <div class="form-row"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {NetworkType} from 'nem2-sdk'

// child components
import FormWrapper from '@/components/FormWrapper/FormWrapper.vue'
import FormLabel from '@/components/FormLabel/FormLabel.vue'

// configuration
import appConfig from '@/../config/app.conf.json'
import feesConfig from '@/../config/fees.conf.json'
import networkConfig from '@/../config/network.conf.json'
import packageConfig from '@/../package.json'

@Component({
  components: {
    FormWrapper,
    FormLabel,
  },
})
export default class AboutPage extends Vue {
  public configs = {
    package: packageConfig,
    app: appConfig,
    fees: feesConfig,
    network: networkConfig,
  }
  public types = NetworkType

  public isNetworkType(type): boolean {
    return networkConfig.defaultNetworkType === type
  }

  public getNodeLink(): string {
    return networkConfig.defaultNode.url + '/node/info'
  }
}
</script>

<style lang="less" scoped>
@import "../../../resources/css/variables.less";
.about-container {
  display: block;
  width: 100%;
  clear: both;
  min-height: 1rem;
  margin-left: 45px;
  .form-row {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;

    .label {
      float: left;
      width: 250px;
      font-size: @normalFont;
      margin-left: 25px;
    }

    .value {
      float: left;
      font-size: @smallerFont;
      font-weight: bolder;
    }
  }
  .subtitle {
    font-size: @biggerFont;
    margin-top: 50px;
  }
}
</style>

