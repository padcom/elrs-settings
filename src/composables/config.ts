import { ref } from 'vue'

import type { Config } from '@/types'
import { singleton } from '@/lib/singleton'
import { useBuildOptions } from './build'
import { useOptions } from './options'

export const useConfig = singleton(() => {
  const { targetBaseUrl } = useBuildOptions()
  const config = ref<Config>()

  async function load() {
    const response = await fetch(`${targetBaseUrl.value}/config`)
    if (response.ok) {
      config.value = await response.json()
      const { options } = useOptions()
      options.value = config.value?.options
    } else {
      config.value = undefined
    }
  }

  return { config, load }
})
