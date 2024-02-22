<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import LoadingSpinner from './components/loading/LoadingSpinner.vue'

const userStore = useUserStore()
const { state, isAdmin } = storeToRefs(userStore)

onMounted(async () => {
  if (localStorage.getItem('auth')) {
    await userStore.checkAuth()
  }
})

const logoutHandler = async () => {
  await userStore.logout()
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="headerContainer">
        <RouterLink class="logoLink" :to="{ name: 'home' }">LOGO</RouterLink>
        <div v-if="state.isAuth" class="user">
          {{ state.user.email }}
          <button @click.prevent="logoutHandler">Logout</button>
        </div>
        <div v-if="state.isLoading">
          <LoadingSpinner />
        </div>
        <nav class="headerNav">
          <RouterLink v-if="isAdmin" :to="{ name: 'admin' }">Admin</RouterLink>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
          <RouterLink :to="{ name: 'register' }">Register</RouterLink>
          <RouterLink :to="{ name: 'cart' }">Cart</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.header {
}

.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.logoLink {
  color: var(--white);
}
.headerNav {
  display: flex;
  gap: 20px;
}

.headerNav a {
  color: var(--white);
}
.headerNav .router-link-active {
  color: aqua;
}
.user {
  color: white;
}
</style>
