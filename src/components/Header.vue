<template>
  <header>
    <Logo />
    <h1>ExpressLRS</h1>
    <h2>{{ config?.config.product_name }}</h2>
    <h2><strong>Firmware Rev.</strong> {{ version }} {{ config?.config.reg_domain }}</h2>
  </header>
</template>

<script lang="ts" setup>
import Logo from '@/assets/logo.svg?component'

import { useBuildOptions } from '@/composables/build'
import { useConfig } from '@/composables/config'

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
</style>
