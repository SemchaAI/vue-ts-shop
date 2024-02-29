<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/product'
import ChevronLeftVue from '../icons/ChevronLeft.vue'
import ChevronRight from '../icons/ChevronRight.vue'

const productsStore = useProductsStore()
const { page, total } = storeToRefs(productsStore)
const nextPage = () => {
  if (total.value > page.value) {
    productsStore.setPage(Number(page.value) + 1)
  }
}
const prevPage = () => {
  if (page.value > 1) {
    productsStore.setPage(Number(page.value) - 1)
  }
}
const toPage = (page: number) => {
  if (page <= total.value && page > 0) {
    productsStore.setPage(page)
  }
}
</script>
<template>
  <div class="paginationContainer">
    <button class="paginationListBtn" @click.prevent="prevPage">
      <ChevronLeftVue />
    </button>
    <ul class="paginationList">
      <li :key="i" v-for="i in total">
        <button
          class="paginationListBtn"
          :class="page === i ? 'active' : ''"
          @click.prevent="toPage(i)"
        >
          {{ i }}
        </button>
      </li>
    </ul>
    <button class="paginationListBtn" @click.prevent="nextPage">
      <ChevronRight />
    </button>
  </div>
</template>

<style scoped lang="scss">
.paginationContainer {
  display: flex;
  justify-content: center;
  color: var(--on-background);

  @include btnTypo;
}
.paginationList {
  display: flex;
  gap: 5px;
  padding: 0 10px;
}
.paginationListBtn {
  @include flexCentered;
  @include transition;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  @include colorMix(primary);
  &:hover,
  &:focus {
    background-color: var(--primary-focused);
  }
}
.active {
  @include colorMix(secondary);
}
</style>
