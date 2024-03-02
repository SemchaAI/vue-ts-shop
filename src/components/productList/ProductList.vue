<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/product'

import { EStatus } from '@/models/IProduct'

import ProductCard from '../product/ProductCard.vue'
import SidebarTypes from '../sidebar/SidebarTypes.vue'
import SearchInput from '../Input/SearchInput.vue'
import ProductsPagination from '../pagination/ProductsPagination.vue'

const productsStore = useProductsStore()
const { state, products, page, limit, selectedType, title } = storeToRefs(productsStore)

onMounted(async () => {
  await productsStore.getTypes()
  const tmp = await productsStore.getAll(
    null,
    selectedType.value,
    page.value,
    limit.value,
    title.value
  )
  if (tmp) {
    productsStore.setProducts(tmp.data.products)
    productsStore.setTotal(tmp.data.total)
    // if (tmp.data.total > 5 && page.value == 1) {
    //   pagination.value = [page.value, page.value + 1, page.value + 2, page.value + 3, total.value]
    // }
    // if (tmp.data.total > 5 && page.value != 1) {
    //   pagination.value = [page.value - 1, page.value, page.value + 1, total.value]
    // }
    // if (total.value > 5 && page.value + 1 == total.value) {
    //   pagination.value = [page.value - 1, page.value - 1, page.value, total.value]
    // }
  }
})
watch([page, selectedType, title], async (newVal, oldVal) => {
  console.log(oldVal, newVal)
  if (oldVal[1] !== newVal[1] || oldVal[2] !== newVal[2]) {
    productsStore.setPage(1)
  }
  let res = await productsStore.getAll(
    null,
    selectedType.value,
    page.value,
    limit.value,
    title.value
  )
  if (res) {
    productsStore.setProducts(res.data.products)
    productsStore.setTotal(res.data.total)
    // if (total.value > 5 && page.value == 1) {
    //   pagination.value = [page.value, page.value + 1, page.value + 2, page.value + 3, total.value]
    // }
    // if (total.value > 5 && page.value != 1) {
    //   pagination.value = [1, page.value, page.value + 1, total.value - 1, total.value]
    // }
    // if (total.value > 5 && page.value == total.value) {
    //   pagination.value = [page.value - 3, page.value - 2, page.value - 1, total.value]
    // }
  }
  console.log(res, 'watcher')
})
</script>

<template>
  <section class="products">
    <div class="wrapper">
      <div class="productsContainer">
        <h1 class="productsTitle">Все товары</h1>
        <div class="productsBlock">
          <SidebarTypes class="sidebar" />
          <div class="productsWrapper">
            <SearchInput />
            <div class="verify" v-if="state.status === EStatus.SUCCESS">
              <ul v-if="products.length > 0" class="productsList">
                <ProductCard :key="product._id" v-for="product in products" :list="product" />
              </ul>
              <ProductsPagination />
            </div>
            <div v-else>
              <ul class="productsList">
                <ProductCard :key="i" v-for="(_, i) in products" :list="null" />
              </ul>
              <ProductsPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.products {
}
.productsContainer {
  margin-top: 80px;
}
.productsList {
  margin-top: 40px;
  /* temporal margin */
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 0;
  color: var(--surface);
}
.sidebar {
  width: 25%;
}
.productsBlock {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.productsWrapper {
  flex-grow: 1;
}
.productsTitle {
  color: var(--primary);

  @include headline3Typo;
}
.spinnerContainer {
  margin: auto;
  width: 100px;
  height: 100px;
}
</style>
