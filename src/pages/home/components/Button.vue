<template>
  <button v-bind="$attrs"><slot /></button>
</template>

<style lang="postcss" scoped>
button {
  background-color: #2196F3;
  outline: none;
  border: none;
  padding: 0 26px;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  line-height: 36px;
}
</style>
