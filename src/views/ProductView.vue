<script lang="ts" setup>
import { ProductService } from '@/services/product.service'

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores/product'
import type { IProduct } from '@/models/IProduct'
const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const productsStore = useProductsStore()
const url = import.meta.env.VITE_BASE_URL_BD

const isLoading = ref(false)
const product = ref({
  data: {} as IProduct
})

// const { data: product, isSuccess } = useQuery({
//   queryKey: ['getProduct'],
//   queryFn: () => ProductService.getOne(id)
// })
onMounted(async () => {
  product.value = await ProductService.getOne(id)
  // const tmp = await productsStore.getTypes()
  isLoading.value = true
})
</script>

<template>
  <section class="product">
    <div class="wrapper">
      <div v-if="isLoading" class="productContainer">
        <img :src="url + '/' + product.data.img" :alt="product.data.title" />
        <h1 class="productTitle">{{ product?.data.title }}</h1>
        <p class="productDescription">{{ product?.data.description }}</p>
        <div class="productInfo">
          <p class="productPrice"><span>Цена: </span>{{ product?.data.price }}<span>MDL</span></p>
          <p class="productCount"><span>В наличии: </span>{{ product?.data.cnt }}</p>
        </div>
        <div v-if="product?.data.info">
          <h2 class="productInfoTitle">Характеристики</h2>
          <div
            :key="information._id"
            v-for="information in product?.data.info"
            style="display: flex; justify-content: space-between"
          >
            <h2 class="productInfoTitle">{{ information.title }}</h2>
            <p class="productInfoText">{{ information.description }}</p>
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </section>
</template>

<style scoped>
.product {
  color: var(--white);
}
</style>
