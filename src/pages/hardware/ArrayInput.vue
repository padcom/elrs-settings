<template>
  <Field v-bind="$attrs">
    <template #default="{ id }">
      <input :id="id" v-model="editableValue" size="40">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Field from './Field.vue'

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
