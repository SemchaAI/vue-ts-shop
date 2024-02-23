<script setup lang="ts">
import { ProductService } from '@/services/product.service'
import { useQuery } from '@tanstack/vue-query'
import LoadingSpinner from '../loading/LoadingSpinner.vue'
import ProductCard from '../product/ProductCard.vue'
import SidebarTypes from '../sidebar/SidebarTypes.vue'

const { data: products, isSuccess } = useQuery({
  queryKey: ['getProducts'],
  queryFn: () => ProductService.getAll(),
  refetchInterval: 5000
})
</script>

<template>
  <section class="products">
    <div class="wrapper">
      <div class="productsContainer">
        <SidebarTypes class="sidebar" />
        <div class="productsWrapper">
          <h1 class="productsTitle">New sneakers collection</h1>
          <ul v-if="isSuccess" v-auto-animate class="productsList">
            <ProductCard
              v-if="products?.data"
              :total="products.data.total"
              :page="products.data.page"
              :products="products.data.products"
            />
          </ul>
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
</style>
