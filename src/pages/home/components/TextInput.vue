<template>
  <Field :label="label" :description="description">
    <template #aux><slot /></template>
    <template #default="{ id }">
      <input :id="id" v-model="value" v-bind="$attrs">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'

defineProps({
  label: { type: String, default: 'Label' },
  description: { type: String, default: '' },
})

const value = defineModel({ type: String, default: '' })
</script>
