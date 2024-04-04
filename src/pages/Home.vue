<template>
  <Tabs>
    <Tab v-if="!isTx" title="Model">
      <Model />
    </Tab>
    <Tab title="Options">
      <Options />
    </Tab>
    <Tab title="WiFi">
      <WiFi />
    </Tab>
    <Tab v-if="isTx && false" title="Buttons">
      <Buttons />
    </Tab>
    <Tab title="Update">
      <FirmwareUpdate />
    </Tab>
  </Tabs>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import Tabs from './home/components/Tabs.vue'
import Tab from './home/components/Tab.vue'
import Model from './home/Model.vue'
import Options from './home/Options.vue'
import WiFi from './home/WiFi.vue'
import Buttons from './home/Buttons.vue'
import FirmwareUpdate from './home/FirmwareUpdate.vue'
import { useConfig } from '@/composables/config'
import { useBuildOptions } from '@/composables/build'

const { load } = useConfig()
const { isTx } = useBuildOptions()

onMounted(load)
</script>
