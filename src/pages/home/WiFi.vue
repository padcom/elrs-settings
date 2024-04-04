<template>
  <Panel>
    <SectionHeader>{{ title }}</SectionHeader>
    <p>
      Here you can join a network and it will be saved as your Home network.
      When you enable WiFi in range of your Home network, ExpressLRS will automatically connect to it.
      In Access Point (AP) mode, the network name is ExpressLRS TX or ExpressLRS RX with password "expresslrs".
    </p>

    <div class="content">
      <div class="options">
        <RadioButton v-model="action" value="new-network" label="Set new Home network" />
        <RadioButton v-model="action" value="one-time" label="One-time connect to network, ratain Home network setting" />
        <RadioButton v-model="action" value="start-ap" label="Start AP mode, ratain Home network setting" />
        <RadioButton v-model="action" value="forget" label="Forget Home network setting, always use AP mode" />
      </div>
      <br>
      <DropdownInput v-if="showWiFiControls" v-model="ssid" label="WiFi SSID" placeholder="SSID" :options="networks" />
      <TextInput v-if="showWiFiControls" v-model="password" label="WiFi password" type="password" />

      <div class="actions">
        <Button>Confirm</Button>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

import Panel from '@/components/Panel.vue'
import SectionHeader from './components/SectionHeader.vue'
import RadioButton from './components/RadioButton.vue'
import TextInput from './components/TextInput.vue'
import DropdownInput from './components/DropdownInput.vue'
import Button from './components/Button.vue'

import { useConfig } from '@/composables/config'
import { useNetworks } from '@/composables/networks'

const { config } = useConfig()
const { networks, load } = useNetworks()
const action = ref('new-network')
const ssid = ref('')
const password = ref('')

const showWiFiControls = computed(() => ['new-network', 'one-time'].includes(action.value))

const title = computed(() => {
  if (config.value?.config.mode === 'AP') {
    return 'Currently in Access Point mode'
  } else {
    return `Current Home network: ${config.value?.config.ssid}`
  }
})

onMounted(load)
</script>

<style lang="postcss" scoped>
.content {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .options {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .actions {
    margin-top: 24px;
  }
}
</style>
