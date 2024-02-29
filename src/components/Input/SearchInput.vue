<script setup lang="ts">
import EyeIcon from '@/components/icons/EyeIcon.vue'
import { useProductsStore } from '@/stores/product'
const productsStore = useProductsStore()

let filterTimeout: ReturnType<typeof setTimeout>

const changeHandler = (event: Event) => {
  clearTimeout(filterTimeout)

  filterTimeout = setTimeout(() => {
    productsStore.setTitle((event.target as HTMLInputElement).value)
  }, 500)
}
</script>

<template>
  <div class="inputContainer">
    <input
      class="input"
      @input="changeHandler"
      type="text"
      placeholder="Поиск"
      aria-label="Поиск"
    />
    <EyeIcon class="icon" />
  </div>
</template>

<style scoped lang="scss">
.inputContainer {
  position: relative;
}
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

.icon {
  position: absolute;
  right: 20px;
  top: calc(50% - 12px);
  pointer-events: none;
  fill: var(--on-background);

  @include transition;
}
</style>
