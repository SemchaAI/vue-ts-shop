<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'
import GlobalHeader from './components/header/GlobalHeader.vue'
import FooterComponent from './components/footer/FooterComponent.vue'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'

register()
</script>

<template>
  <GlobalHeader />
  <RouterView />
  <ModalsContainer />
  <FooterComponent />
</template>
