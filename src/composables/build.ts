import { ref } from 'vue'

export function useBuildOptions() {
  const platform = ref(import.meta.env.VITE_PLATFORM)
  const version = ref(import.meta.env.VITE_VERSION)
  const isTx = ref(import.meta.env.VITE_IS_TX)
  const sx127x = ref(import.meta.env.VITE_SX127X)

  return {
    platform,
    version,
    isTx,
    sx127x,
  }
}
