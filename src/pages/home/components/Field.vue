<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <slot name="aux" />
    <slot :id="id" />
  </div>
</template>

<script lang="ts" setup>
import { uniqueId } from '@/composables/id'

defineProps({
  label: { type: String, default: 'Label' },
  description: { type: String, default: 'Description' },
})

const id = uniqueId()
</script>

<style lang="postcss" scoped>
.field {
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0,0,0,0.54);
  }

  & ::v-deep(input) {
    border: none;
    border-bottom: solid 1px rgba(0,0,0,0.26);
    font-size: 16px;
    outline: none;
    margin-bottom: 1px;
    padding-block: 2px;
  }

  &:focus-within {
    label {
      color: #2196F3;
    }

    & ::v-deep(input) {
      border-bottom: solid 2px #2196F3;
      margin-bottom: 0px;
    }
  }
}
</style>
