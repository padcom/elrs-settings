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
      <DropdownInput v-if="showWiFiControls" v-model="ssid" class="ssid" label="WiFi SSID" placeholder="SSID"
        :options="networks"
        :class="{ loading }"
      />
      <TextInput v-if="showWiFiControls" v-model="password" label="WiFi password" type="password" />

      <ActionsPanel>
        <Button @click="save">Confirm</Button>
      </ActionsPanel>
    </div>
  </Panel>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import Panel from '@/components/Panel.vue'
import SectionHeader from './components/SectionHeader.vue'
import RadioButton from './components/RadioButton.vue'
import TextInput from './components/TextInput.vue'
import DropdownInput from './components/DropdownInput.vue'
import ActionsPanel from '@/components/ActionsPanel.vue'
import Button from '@/components/Button.vue'

import { useConfig } from '@/composables/config'
import { useNetworks } from '@/composables/networks'
import { useAlert } from '@/composables/alert'

const { config } = useConfig()
const { networks, loading } = useNetworks()
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

const { info, error } = useAlert()

// eslint-disable-next-line @typescript-eslint/no-shadow
async function connectToNetwork(ssid: string, password: string, temporary: boolean) {
  const body = new FormData()
  body.append('networktype', temporary ? '1' : '0')
  body.append('network', ssid)
  body.append('password', password)

  const url = temporary ? '/sethome' : '/sethome?save'

  const response = await fetch(url, { method: 'POST', body })
  if (response.ok) {
    const message = await response.text()
    info('Start Access Point', message)
  } else {
    const message = await response.text()
    error('Start Access Point', message)
  }
}

async function startAccessPoint() {
  const response = await fetch(`/access`, { method: 'POST' })
  if (response.ok) {
    const message = await response.text()
    info('Start Access Point', message)
  } else {
    const message = await response.text()
    error('Start Access Point', message)
  }
}

async function forgetNetworkAndStartAccessPoint() {
  const response = await fetch(`/forget`, { method: 'POST' })
  if (response.ok) {
    const message = await response.text()
    info('Forget Home Network', message)
  } else {
    const message = await response.text()
    error('Forget Home Network', message)
  }
}

// eslint-disable-next-line complexity
function save() {
  switch (action.value) {
    case 'new-network':
      connectToNetwork(ssid.value, password.value, false)
      break
    case 'one-time':
      connectToNetwork(ssid.value, password.value, true)
      break
    case 'start-ap':
      startAccessPoint()
      break
    case 'forget':
      forgetNetworkAndStartAccessPoint()
      break
  }
}
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

  .ssid.loading ::v-deep(input) {
    background: url('@/assets/wifi.svg');
    background-repeat: no-repeat;
    background-position: right;
  }
}
</style>
