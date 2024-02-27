<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
// import { ProductService } from '@/services/product.service'
// import { useQuery } from '@tanstack/vue-query'
import { useProductsStore } from '@/stores/product'

import { EStatus, type IProduct } from '@/models/IProduct'

import LoadingSpinner from '../loading/LoadingSpinner.vue'
import ProductCard from '../product/ProductCard.vue'
import SidebarTypes from '../sidebar/SidebarTypes.vue'

const productsStore = useProductsStore()
const { state, products, page, limit, total, selectedType, title } = storeToRefs(productsStore)
const titleNew = ref(null)
let filterTimeout: ReturnType<typeof setTimeout>
// const pagination = ref<Number | Number[]>(total.value)

// const list = ref<IProduct[]>(products.value)
// console.log(products.value)

// const page = ref<Number>(1)

// const {
//   data: products,
//   status,
//   isPlaceholderData
// } = useQuery({
//   queryKey: ['getProducts', page, productsStore.state.selectedType._id],
//   queryFn: () => ProductService.getAll(null, productsStore.state.selectedType._id, page.value, 6),
//   // refetchInterval: 5000,
//   // placeholderData: (previousData) => previousData
//   gcTime: 0
// })

// const prevPage = () => {
//   page.value = Math.max(Number(page.value) - 1, 1)
// }
// const nextPage = () => {
//   if (page.value < products?.value?.data?.total) {
//     page.value = Number(page.value) + 1
//     console.log(page.value)
//   }
// }
// const toPage = (data: Number) => {
//   page.value = data
// }

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

const changeHandler = (event: Event) => {
  clearTimeout(filterTimeout)

  filterTimeout = setTimeout(() => {
    console.log('====>')
    productsStore.setTitle((event.target as HTMLInputElement).value)
  }, 500)
}

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
        <SidebarTypes class="sidebar" />
        <div class="productsWrapper">
          <h1 class="productsTitle">New sneakers collection</h1>
          <input @input="changeHandler" style="height: 50px; width: 100%" type="text" />
          <div class="verify" v-if="state.status === EStatus.SUCCESS">
            <ul v-if="products.length > 0" v-auto-animate class="productsList">
              <ProductCard :key="product._id" v-for="product in products" :list="product" />
            </ul>
            <div style="display: flex; color: white; justify-content: center">
              <button @click.prevent="prevPage">Prev</button>
              <ul style="display: flex; padding: 0 5px">
                <li :key="i" v-for="i in total">
                  <button
                    style="padding: 5px"
                    :class="page === i ? 'active' : ''"
                    @click.prevent="toPage(i)"
                  >
                    {{ i }}
                  </button>
                </li>
              </ul>
              <button @click.prevent="nextPage">Next</button>
            </div>
          </div>
          <div v-else class="spinnerContainer">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
}
.productsList {
  margin-top: 40px;
  /* temporal margin */
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0;
  color: var(--black);
}
.sidebar {
  width: 25%;
}
.productsContainer {
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.productsWrapper {
  width: 75%;
}
.productsTitle {
  font-size: 40px;
  font-weight: bold;
  line-height: 50px;
  color: var(--white);
  text-align: center;
}
.spinnerContainer {
  margin: auto;
  width: 100px;
  height: 100px;
}
.active {
  background-color: black;
}
</style>
