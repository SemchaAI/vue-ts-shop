<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'blur'])

const inputHandler = (event: Event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input :value="modelValue" @input="inputHandler" @blur="$emit('blur')" class="input" />
</template>

<style scoped lang="scss">
.input {
  height: 50px;
  width: 100%;
  padding: 0 20px;

  outline: none;

  border: 1px solid var(--on-surface-medium-accent);
  border-radius: 3.5px;

  color: var(--on-background);
  background-color: var(--background);

  @include body1Typo;
  @include transition;
  &:hover,
  &:focus {
    border: 1px solid var(--primary);
    outline: none;
  }
  &:focus + .icon {
    fill: var(--secondary);
  }
}
</style>
