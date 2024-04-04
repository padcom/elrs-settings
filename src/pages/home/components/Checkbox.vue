<template>
  <div class="field">
    <input :id="id" v-model="value" type="checkbox" :readonly="readonly">
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { uniqueId } from '@/composables/id'

defineProps({
  label: { type: String, default: 'Label' },
  readonly: { type: Boolean, default: false },
})

const value = defineModel({ type: Boolean, default: false })

const id = uniqueId()
</script>

<style lang="postcss" scoped>
.field {
  display: flex;
  align-items: center;
  gap: 16px;

  label {
    cursor: pointer;
  }
}
</style>
