<template>
  <Field v-bind="$attrs">
    <template #icon>
      <img class="icon" :src="icon" title="PWM Output">
    </template>

    <template #default="{ id }">
      <input :id="id" v-model="value" type="number" size="3">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'
import icon from '@/assets/icon-pwm.svg?inline'

const value = defineModel({ type: Number })
</script>
