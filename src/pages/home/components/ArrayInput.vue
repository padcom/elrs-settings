<template>
  <Field v-bind="$attrs" :label="label">
    <template #aux><slot /></template>
    <template #default="{ id }">
      <input :id="id" v-model="editableValue" :placeholder="placeholder" :readonly="readonly">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Field from './Field.vue'

defineProps({
  label: { type: String, default: 'Label' },
  placeholder: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
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
