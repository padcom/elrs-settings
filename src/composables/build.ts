import { ref } from 'vue'

export function useBuildOptions() {
  const platform = ref(import.meta.env.VITE_PLATFORM)
  const version = ref(import.meta.env.VITE_VERSION)
  const isTx = ref(import.meta.env.VITE_IS_TX)
  const sx127x = ref(import.meta.env.VITE_SX127X)
  const hasSubGHz = ref(import.meta.env.VITE_HAS_SUB_GHZ)
  const hasProxy = ref(import.meta.env.VITE_HAS_PROXY)

  return {
    platform,
    version,
    isTx,
    sx127x,
    hasSubGHz,
    hasProxy,
  }
}
