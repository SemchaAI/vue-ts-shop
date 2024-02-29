<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'

import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
import MainBtn from '../buttons/MainBtn.vue'
import MainLink from '../links/MainLink.vue'
import HeaderNavigation from './HeaderNavigation.vue'

const userStore = useUserStore()
const cartStore = useCartStore()

const { state, isAdmin } = storeToRefs(userStore)

const { total, inCart, items } = storeToRefs(cartStore)

onMounted(async () => {
  if (localStorage.getItem('auth')) {
    await userStore.checkAuth()
  }
  if (state.value.isAuth) {
    await cartStore.getCartProducts(state.value.user.id)
  }
})
// watch([items.value], async (newVal, oldVal) => {
//   console.log(JSON.stringify(newVal) !== JSON.stringify(oldVal))
//   if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && state.value.isAuth) {
//     const cartProducts = await cartStore.getCartProducts(state.value.user.id)
//     // cartStore.setCartProducts(cartProducts?.data)
//   }
// })

const logoutHandler = async () => {
  await userStore.logout()
  cartStore.setCartProducts([])
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="headerContainer">
        <MainLink class="logoLink headerBlock" to="home">LOGO</MainLink>
        <div v-if="state.isAuth" class="user headerBlock">
          {{ state.user.email }}
          <MainBtn type="contain" @click.prevent="logoutHandler">Logout</MainBtn>
        </div>
        <div class="headerBlock" v-if="state.isLoading">
          <LoadingSpinner />
        </div>
        <HeaderNavigation :isAdmin="isAdmin" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--background-soft);
}

.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.headerBlock {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
}
.logoLink {
  color: var(--primary);
  justify-content: flex-start;
}

.user {
  color: var(--on-background);
  align-items: center;
  gap: 20px;
}
</style>
