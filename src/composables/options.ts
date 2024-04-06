/* eslint-disable max-lines-per-function */
import { ref } from 'vue'

import type { BuildOptions } from '@/types'
import { singleton } from '@/lib/singleton'
import { useConfig } from './config'

export const useOptions = singleton(() => {
  const options = ref<BuildOptions>()

  async function load() {
    const response = await fetch(`/options.json`)
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

    const response = await fetch(`/options.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options.value,
        uid: config.value.config.uid,
      }),
    })

    return response.ok
  }

  async function reset() {
    const response = await fetch(`/reset?options`, { method: 'POST' })

    return response.ok
  }

  return { options, load, save, reset }
})
