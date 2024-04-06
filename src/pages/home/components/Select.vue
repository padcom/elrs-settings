<template>
  <Field v-bind="$attrs" :label="label">
    <template #aux><slot name="aux" /></template>
    <template #default="{ id }">
      <div class="select">
        <select :id="id" v-model="value" :readonly="readonly">
          <slot />
        </select>
      </div>
    </template>
  </Field>
</template>

<script lang="ts" setup>
import Field from './Field.vue'

defineProps({
  label: { type: String, default: 'Label' },
  placeholder: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
})

const value = defineModel({ type: String, default: () => [] })
</script>

<style lang="postcss" scoped>
select {
  appearance: none;
}

.select {
  display: grid;
  align-items: center;
  grid-template-areas: "select";
}

select, .select:after {
  grid-area: select;
}

.select:after {
  content: "";
  justify-self: end;
  width: 0.8em;
  height: 0.5em;
  background-color: var(--select-arrow);
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}
</style>
