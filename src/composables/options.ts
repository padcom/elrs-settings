/* eslint-disable max-lines-per-function */
import { ref } from 'vue'

import type { BuildOptions } from '@/types'
import { singleton } from '@/lib/singleton'
import { useBuildOptions } from './build'
import { useConfig } from './config'

export const useOptions = singleton(() => {
  const { targetBaseUrl } = useBuildOptions()
  const options = ref<BuildOptions>()

  async function load() {
    const response = await fetch(`${targetBaseUrl.value}/options.json`)
    if (response.ok) {
      options.value = await response.json()
      const { config } = useConfig()
      if (config.value && options.value) {
        config.value.options = options.value
      }
    } else {
      options.value = undefined
    }
  }

  async function save() {
    const { config } = useConfig()
    if (!config.value || !options.value) return false

    const response = await fetch(`${targetBaseUrl.value}/options.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options.value,
        uid: config.value.config.uid,
      }),
    })

    return response.ok
  }

  return { options, load, save }
})