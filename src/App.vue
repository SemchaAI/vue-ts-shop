<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'
import GlobalHeader from './components/header/GlobalHeader.vue'
import FooterComponent from './components/footer/FooterComponent.vue'
import ErrorComponent from './components/error/ErrorComponent.vue'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'

import { useErrorStore } from './stores/erorrs'
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from './stores/favorite'

const errorStore = useErrorStore()
const favoriteStore = useFavoriteStore()

const { state, isCritical, isError } = storeToRefs(errorStore)

register()

favoriteStore.init()
</script>

<template>
  <GlobalHeader />
  <main class="main">
    <RouterView />
  </main>
  <FooterComponent />

  <ModalsContainer />
  <ErrorComponent v-if="isError" :errors="state.errors" />
</template>

<style scoped lang="scss">
.main {
  flex-grow: 1;
}
</style>
