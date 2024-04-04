<template>
  <Field v-bind="$attrs">
    <template #icon>
      <img class="icon" :src="icon" title="PWM Output">
    </template>

    <template #default="{ id }">
      <input :id="id" v-model="editableValue" type="text" size="40">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Field from './Field.vue'
import icon from '@/assets/icon-pwm.svg?inline'

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
