<script setup lang="ts">
import type { ILink } from '@/components/links/MainLink.interface'
const props = defineProps<ILink>()
const { to } = props
const classes = ['link']
</script>
<template>
  <RouterLink :class="classes" :to="{ name: to }">
    <slot></slot>
  </RouterLink>
</template>

<style scoped lang="scss">
.link {
  text-decoration: none;
  @include body1Typo;
  @include transition;

  color: var(--primary);
  &.router-link-active {
    color: var(--secondary);
  }
}
</style>
