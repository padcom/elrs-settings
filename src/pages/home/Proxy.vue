<template>
  <Panel>
    <SectionHeader>Proxy</SectionHeader>
    <p>
      Here you can configure re-translator proxy.
    </p>

    <Content v-if="proxy">
      <Checkbox label="Is this the proxy transmitter" />
      <TextInput v-model="bindingPhrase"
        label="Secondary binding phrase"
        placeholder="Binding phrase"
      />
      <ArrayInput v-model="proxy['proxy-uid']" label="Secondary UID" readonly />
      <Select v-model.number="proxy.aux" label="Channel to control proxy connection">
        <option v-for="index in 12" :key="index" :value="index + 4">AUX{{ index + 4 }}</option>
      </Select>
    </Content>

    <Actions v-if="proxy">
      <Button type="primary" @click="save">Save proxy settings</Button>
    </Actions>
  </Panel>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

import Panel from '@/components/Panel.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import Content from '@/components/Content.vue'
import Actions from '@/components/Actions.vue'
import Button from '@/components/Button.vue'
import Checkbox from './components/Checkbox.vue'
import TextInput from './components/TextInput.vue'
import ArrayInput from './components/ArrayInput.vue'
import Select from './components/Select.vue'

import { useAlert } from '@/composables/alert'
import { useProxySettings } from '@/composables/proxy'
import { useHardware } from '@/composables/hardware'
import { uid } from '@/lib/uid'

const { question, error } = useAlert()
const { proxy, load, save: saveProxySettings, originalUID } = useProxySettings()
const { reboot } = useHardware()
const bindingPhrase = ref('')

watch(bindingPhrase, newValue => {
  if (proxy.value) {
    if (newValue) {
      proxy.value['proxy-uid'] = uid(newValue)
    } else {
      proxy.value['proxy-uid'] = originalUID.value
    }
  }
})

onMounted(load)

async function save() {
  const result = await saveProxySettings()
  if (result.status === 'ok') {
    if (await question(
      'Proxy settings',
      'Proxy settings have been saved. Do you want to restart now for the changes to take effect?',
      'Reboot',
      'No',
    ) !== 'cancel') {
      reboot()
    }
  } else {
    error('Proxy settings', result.msg)
  }
}
</script>
