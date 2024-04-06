import { ref } from 'vue'

import type { Proxy } from '@/types'
import { singleton } from '@/lib/singleton'

export const useProxySettings = singleton(() => {
  const proxy = ref<Proxy>()

  async function load() {
    const response = await fetch(`/proxy.json`)
    if (response.ok) {
      proxy.value = await response.json()
    } else {
      proxy.value = undefined
    }
  }

  async function save() {
    if (!proxy.value) return false

    const response = await fetch(`/proxy.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proxy.value),
    })

    return response.ok
  }

  return { proxy, load, save }
})
