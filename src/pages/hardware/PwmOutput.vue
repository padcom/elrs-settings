<template>
  <Field v-bind="$attrs">
    <template #icon>
      <Icon />
    </template>

    <template #default="{ id }">
      <input :id="id" v-model="value" type="number" size="3">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'
import Icon from '@/assets/icon-pwm.svg?component'

const value = defineModel({ type: Number })
</script>
