<script setup lang="ts">
import type { IBtn } from '@/components/buttons/MainBtn.interface'
const props = withDefaults(defineProps<IBtn>(), {
  type: 'text',
  icon: false
})
const { type } = props

const classes = ['button', `${type}`, `${props.icon ? 'icon' : ''}`]
</script>
<template>
  <button :class="classes" type="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  @include btnTypo;
  @include transition;
  padding: 10px 15px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.text {
  &:hover,
  &:focus {
    background-color: var(--surface);
  }
}
.outline {
  border: 1px solid var(--btn-outline-border);
  &:hover,
  &:focus {
    border-color: var(--background);
  }
}
.contain {
  color: var(--on-primary);
  background: var(--primary);
  &:hover,
  &:focus {
    color: var(--primary);
    background: var(--on-primary);
  }
}

.icon {
  padding: 5px;
  &:hover,
  &:focus {
    fill: var(--tertiary);
    border-color: var(--primary);
    background-color: var(--primary);
  }
}
</style>
