<template>
  <Field :label="label" :description="description">
    <template #aux><slot /></template>
    <template #default="{ id }">
      <input :id="id" v-model="editableValue" v-bind="$attrs">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Field from './Field.vue'

defineProps({
  label: { type: String, default: 'Label' },
  description: { type: String, default: '' },
})

const value = defineModel({ type: Array, default: () => [] })

const editableValue = computed({
  get(): string {
    return value.value.join(',')
  },
  set(newValue: string) {
    value.value = newValue.split(',')
  },
})
</script>
