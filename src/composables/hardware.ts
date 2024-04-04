/* eslint-disable max-lines-per-function */
import { ref } from 'vue'

import { singleton } from '@/lib/singleton'
import { useBuildOptions } from './build'

export const useHardware = singleton(() => {
  const { targetBaseUrl } = useBuildOptions()
  const hardware = ref<any>()

  async function load() {
    const response = await fetch(`${targetBaseUrl.value}/hardware.json`)
    if (response.ok) {
      hardware.value = await response.json()
    } else {
      hardware.value = undefined
    }
  }

  async function save() {
    if (!hardware.value) return false

    const response = await fetch(`${targetBaseUrl.value}/hardware.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hardware.value),
    })

    return response.ok
  }

  return { hardware, load, save }
})