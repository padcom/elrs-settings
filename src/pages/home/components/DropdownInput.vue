<template>
  <Field v-bind="$attrs" :label="label" class="dropdown">
    <template #aux><slot /></template>
    <template #default="{ id }">
      <input :id="id" v-model="value" type="string" :placeholder="placeholder" :readonly="readonly" class="dropdown-input"
        @focus="showOptions = true"
        @blur="showOptions = false"
      >
      <div v-show="options.length > 0 && showOptions" class="dropdown-content">
        <div v-for="option in options" :key="option" class="dropdown-item" @mousedown="selectOption(option)">
          {{ option }}
        </div>
      </div>
    </template>
  </Field>
</template>

<script lang="ts" setup>
import { ref, type PropType } from 'vue'
import Field from './Field.vue'

defineProps({
  label: { type: String, default: 'Label' },
  placeholder: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  options: { type: Array as PropType<string[]>, default: () => [] },
})

const value = defineModel({ type: String })

const showOptions = ref(false)

function selectOption(option: string) {
  value.value = option
}
</script>

<style lang="postcss" scoped>
.dropdown {
  position: relative;

  .dropdown-content {
    position: absolute;
    top: 46px;
    z-index: 1;
    background-color: #fff;
    max-height: 248px;
    border: 1px solid #e7ecf5;
    box-shadow: 0px -8px 34px 0px rgba(0,0,0,0.05);
    overflow: auto;
    width: 100%;

    .dropdown-item {
      padding-block: 4px;
      cursor: pointer;

      &:hover {
        background-color: #e7ecf5;
      }
    }
  }
}
</style>
