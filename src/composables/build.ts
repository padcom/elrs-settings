import { computed } from 'vue'

export function useBuildOptions() {
  const targetBaseUrl = computed(() => import.meta.env.VITE_APP_TARGET_BASE_URL)
  const version = computed(() => import.meta.env.VITE_APP_VERSION)
  const isTx = computed(() => import.meta.env.VITE_APP_IS_TX)
  const sx127x = computed(() => import.meta.env.VITE_APP_SX127X)

  return {
    targetBaseUrl,
    version,
    isTx,
    sx127x,
  }
}
