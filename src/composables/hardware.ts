/* eslint-disable max-lines-per-function */
import { ref } from 'vue'

import { singleton } from '@/lib/singleton'
import { cleanupObjectFromUndefined } from '@/lib/object-cleaner'

export const useHardware = singleton(() => {
  const hardware = ref<any>()

  async function load() {
    const response = await fetch(`hardware.json`)
    if (response.ok) {
      hardware.value = await response.json()
    } else {
      hardware.value = undefined
    }
  }

  async function save() {
    if (!hardware.value) return false

    const body = {
      customised: true,
      ...cleanupObjectFromUndefined(hardware.value),
    }

    const response = await fetch(`/hardware.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      hardware.value = await response.json()
    }

    return true
  }

  return { hardware, load, save }
})
