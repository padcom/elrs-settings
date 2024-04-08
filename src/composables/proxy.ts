import { ref } from 'vue'

import type { Proxy } from '@/types'
import { singleton } from '@/lib/singleton'
import { http } from '@/lib/http-client'

// eslint-disable-next-line max-lines-per-function
export const useProxySettings = singleton(() => {
  const proxy = ref<Proxy>()
  const originalUID = ref<number[]>([])

  async function load() {
    const response = await http(`/proxy.json`)
    if (response.ok) {
      proxy.value = await response.json()
      originalUID.value = proxy.value?.['proxy-uid'] || []
    } else {
      proxy.value = {
        'is-proxy': false,
        'proxy-uid': [],
        aux: 8,
      }
      originalUID.value = []
    }
  }

  async function save() {
    if (!proxy.value) {
      return {
        status: 'error',
        msg: 'Proxy settings not loaded',
      }
    }

    const response = await http(`/proxy.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proxy.value),
    })

    return {
      status: response.ok ? 'ok' : 'error',
      msg: response.statusText,
    }
  }

  return { proxy, load, save, originalUID }
})
