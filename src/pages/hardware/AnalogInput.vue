<template>
  <Field v-bind="$attrs">
    <template #icon>
      <img class="icon" :src="icon" title="Analog input">
    </template>

    <template #default="{ id }">
      <input :id="id" v-model="value" type="number" size="3">
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'
import icon from '@/assets/icon-analog.svg?inline'

const value = defineModel({ type: Number })
</script>

<style lang="postcss" scoped>
input {
  width: 5rem;
}
</style>
