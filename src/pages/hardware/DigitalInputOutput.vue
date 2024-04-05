<template>
  <Field v-bind="$attrs">
    <template #icon>
      <IconInput />
      <IconOutput />
    </template>

    <template #default="{ id }">
      <input :id="id" v-model="value" type="number" size="3">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'
import IconInput from '@/assets/icon-input.svg?component'
import IconOutput from '@/assets/icon-output.svg?component'

const value = defineModel({ type: Number })
</script>

<style lang="postcss" scoped>
input {
  width: 5rem;
}
</style>
