<template>
  <div class="tabs">
    <TabSelector />
    <slot />
  </div>
</template>

<script lang="ts">
export interface Tab {
  id: string
  title: string
  emit: (e: 'selected') => void
}
</script>

<script lang="ts" setup>
import { ref, provide } from 'vue'

import TabSelector from './TabSelector.vue'

const emit = defineEmits<{(e: 'tab-selected', tab: Tab): void}>()

const tabs = ref<Tab[]>([])
const selectedTab = ref<Tab>()

function selectTab(tab: Tab) {
  selectedTab.value = tab
  tab.emit('selected')
  emit('tab-selected', tab)
}

function addTab(tab: Tab) {
  tabs.value.push(tab)

  if (!selectedTab.value) {
    selectedTab.value = tab
  }
}

provide('tabs', tabs)
provide('selectedTab', selectedTab)
provide('addTab', addTab)
provide('selectTab', selectTab)
</script>

<style lang="postcss" scoped>
.tabs {
  display: block;
}
</style>
