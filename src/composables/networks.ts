/* eslint-disable complexity */
/* eslint-disable max-depth */
/* eslint-disable no-await-in-loop */
import { ref } from 'vue'
import { useBuildOptions } from './build'

const sleep = (ms: number) => new Promise(resolve => { setTimeout(resolve, ms) })

export function useNetworks() {
  const { targetBaseUrl } = useBuildOptions()
  const networks = ref<string[]>([])
  const loading = ref(false)

  async function load() {
    loading.value = true

    while (true) {
      try {
        const response = await fetch(`${targetBaseUrl.value}/networks.json`)
        if (response.ok && response.status === 200) {
          networks.value = await response.json()
          break
        }
      } catch (e) {
        // skip errors, we'll try again
      }

      await sleep(2000)
    }

    loading.value = false
  }

  return { networks, load, loading }
}
