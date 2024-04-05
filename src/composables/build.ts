import { ref } from 'vue'

export function useBuildOptions() {
  const targetBaseUrl = ref(import.meta.env.VITE_APP_TARGET_BASE_URL)
  const platform = ref(import.meta.env.VITE_APP_PLATFORM)
  const version = ref(import.meta.env.VITE_APP_VERSION)
  const isTx = ref(import.meta.env.VITE_APP_IS_TX)
  const sx127x = ref(import.meta.env.VITE_APP_SX127X)

  return {
    targetBaseUrl,
    platform,
    version,
    isTx,
    sx127x,
  }
}
