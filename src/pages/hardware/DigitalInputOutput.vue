<template>
  <Field v-bind="$attrs">
    <template #icon>
      <img class="icon" :src="iconInput" title="Digital input">
      <img class="icon" :src="iconOutput" title="Digital output">
    </template>

    <template #default="{ id }">
      <input :id="id" v-model="value" type="number" size="3">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'
import iconInput from '@/assets/icon-input.svg?inline'
import iconOutput from '@/assets/icon-output.svg?inline'

const value = defineModel({ type: Number })
</script>

<style lang="postcss" scoped>
input {
  width: 5rem;
}
</style>
