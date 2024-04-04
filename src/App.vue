<template>
  <header>
    <img :src="logo" width="250" height="250">
    <h1>ExpressLRS</h1>
    <h2>{{ config?.config.product_name }}</h2>
    <h2><strong>Firmware Rev.</strong> {{ version }} {{ config?.config.reg_domain }}</h2>
  </header>
  <main>
    <Panel>
      <RouterView />
    </Panel>
  </main>

  <ul>
    <li><RouterLink to="/">Settings</RouterLink></li>
    <li><RouterLink to="/hardware">Hardware</RouterLink></li>
  </ul>
</template>

<script lang="ts" setup>
import { useBuildOptions } from './composables/build'
import { useConfig } from './composables/config'

import logo from '@/assets/logo.svg?inline'
import Panel from '@/components/Panel.vue'

const { version } = useBuildOptions()
const { config } = useConfig()
</script>

<style lang="postcss" scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(45deg,#9dc66b 5%,#4fa49a 30%,#4361c2);
  padding: 42px;

  h1 {
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
    color: white;
    margin-top: 25px;
    margin-bottom: 10px;
  }

  h2 {
    color: white;
    margin-bottom: -1px;
  }
}

main {
  margin-block: 24px;
  margin-inline: 0;

  @media screen and (width > 510px) {
    margin-inline: 9%;
  }
}
</style>
