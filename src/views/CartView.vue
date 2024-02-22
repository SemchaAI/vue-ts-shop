<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
console.log(cartStore)
</script>

<template>
  <section class="cart">
    <div class="wrapper">
      <div class="cartContainer">
        <h1>Cart</h1>
        <div>table</div>
        <RouterLink :to="{ name: 'order' }">Order Now (tmp to home)</RouterLink>
      </div>
    </div>
  </section>
</template>
