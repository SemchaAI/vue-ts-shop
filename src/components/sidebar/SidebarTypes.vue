<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
const productsStore = useProductsStore()
const { state } = storeToRefs(productsStore)

onMounted(async () => {
  const tmp = await productsStore.getTypes()
  console.log(tmp)
})
</script>

<template>
  <ul class="sideBar">
    <li
      :class="{ activeType: productsStore.state.selectedType._id === type._id }"
      @click="productsStore.setSelectedType(type)"
      :key="type._id"
      v-for="type in state.types"
      class="type"
    >
      {{ type.name }}
    </li>
  </ul>
</template>

<style scoped>
.sideBar {
  position: sticky;
  top: 20px;
  margin-top: 90px;
  padding: 20px 10px;
  background-color: var(--white);
  height: fit-content;
  font-weight: bold;
}
.type {
  padding: 10px;
  cursor: pointer;
}
.activeType {
  background-color: var(--positive);
  color: var(--white);
}
</style>
