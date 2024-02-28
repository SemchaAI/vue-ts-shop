<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'
import GlobalHeader from './components/header/GlobalHeader.vue'
</script>

<template>
  <GlobalHeader />
  <RouterView />
  <ModalsContainer />
</template>
