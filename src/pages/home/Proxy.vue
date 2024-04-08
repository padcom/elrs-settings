<template>
  <Panel>
    <SectionHeader>Proxy</SectionHeader>
    <p>
      Here you can configure re-translator proxy.
    </p>

    <div v-if="proxy" class="inputs">
      <Checkbox v-model="proxy['is-proxy']" label="Can switch to proxy" />
      <TextInput v-if="proxy['is-proxy']" v-model="bindingPhrase"
        label="Secondary binding phrase"
        placeholder="Binding phrase"
      />
      <ArrayInput v-if="proxy['is-proxy']" v-model="proxy['proxy-uid']" label="Secondary UID" readonly />
      <Select v-model.number="proxy.aux" label="Channel to control proxy connection">
        <option v-for="index in 12" :key="index" :value="index + 4">AUX{{ index + 4 }}</option>
      </Select>
    </div>

    <ActionsPanel>
      <Button type="primary" @click="save">Save proxy settings</Button>
    </ActionsPanel>
  </Panel>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import Panel from '@/components/Panel.vue'
import ActionsPanel from '@/components/ActionsPanel.vue'
import Button from '@/components/Button.vue'
import SectionHeader from './components/SectionHeader.vue'
import Checkbox from './components/Checkbox.vue'
import TextInput from './components/TextInput.vue'
import ArrayInput from './components/ArrayInput.vue'
import Select from './components/Select.vue'

import { useAlert } from '@/composables/alert'
import { useProxySettings } from '@/composables/proxy'
import { uid } from '@/lib/uid'
import { useHardware } from '@/composables/hardware'

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

<style lang="postcss" scoped>
.inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}
</style>
