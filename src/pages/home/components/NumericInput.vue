<template>
  <Field v-bind="$attrs" :label="label">
    <template #aux><slot /></template>
    <template #default="{ id }">
      <input :id="id" v-model.number="value" type="number" :placeholder="label" :readonly="readonly">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'

defineProps({
  label: { type: String, default: 'Label' },
  readonly: { type: Boolean, default: false },
})

const value = defineModel({ type: Number })
</script>
