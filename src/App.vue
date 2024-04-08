<template>
  <Header />
  <Navigation />
  <Panel is="main">
    <RouterView />
  </Panel>
  <Footer />

  <Alert ref="alert" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import Panel from '@/components/Panel.vue'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'

import { provideAlert } from './composables/alert'

const alert = ref<InstanceType<typeof Alert>>()

provideAlert(alert)
</script>

<style lang="postcss" scoped>
main {
  margin-block: 24px;
  margin-inline: 0;

  @media screen and (width > 510px) {
    margin-inline: 9%;
  }
}
</style>
