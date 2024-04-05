<template>
  <ul class="navigation">
    <li><RouterLink to="/">Settings</RouterLink></li>
    <li><RouterLink to="/hardware">Hardware</RouterLink></li>
  </ul>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="postcss" scoped>
.navigation {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  list-style: none;
  color: var(--clr-btn-primary);

  a {
    color: black;
    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
  }

  a.router-link-active {
    -webkit-text-stroke-width: 0.25px;
  }
}
</style>
