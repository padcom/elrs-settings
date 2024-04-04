<template>
  <div :id="id" class="tab" :class="{ active: selectedTab?.id === id }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, type Ref } from 'vue'

import type { Tab } from './Tabs.vue'

const props = defineProps({
  id: { type: String, default: () => crypto.randomUUID() },
  title: { type: String, default: 'Tab' },
})

const addTab = inject('addTab') as (tab: Tab) => void
const selectedTab = inject('selectedTab') as Ref<Tab>

onMounted(() => {
  addTab({ title: props.title, id: props.id })
})
</script>

<style lang="postcss" scoped>
.tab {
  display: none;
}

.tab.active {
  display: block;
}
</style>
