<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const url = import.meta.env.VITE_BASE_URL_BD

const cartStore = useCartStore()
const userStore = useUserStore()
const { state } = storeToRefs(userStore)
const { items } = storeToRefs(cartStore)

onMounted(async () => {
  console.log(state.value.user.id)
  const cartProducts = await cartStore.getCartProducts(state.value.user.id)
  console.log(cartProducts)
  cartStore.setCartProducts(cartProducts?.data)
})
</script>

<template>
  <section class="cart">
    <div class="wrapper">
      <div class="cartContainer">
        <h1>Cart</h1>
        <div v-if="items">
          <div v-for="item in items" :key="item._id">
            <div>{{ item.title }}</div>
            <img :src="url + '/' + item.img" :alt="item.title" />
            <div>{{ item.price }}</div>
          </div>
        </div>
        <div v-else>Error.Cart wasnt loaded or its empty please try again</div>
        <RouterLink :to="{ name: 'order' }">Order Now (temporal to home)</RouterLink>
      </div>
    </div>
  </section>
</template>
