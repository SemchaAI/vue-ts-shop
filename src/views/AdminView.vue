<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalType from '@/components/modals/ModalType.vue'
import ModalBrand from '@/components/modals/ModalBrand.vue'
import ModalProduct from '@/components/modals/ModalProduct.vue'

const ModalTypeInstance = useModal({
  component: ModalType,
  attrs: {
    onConfirm() {
      ModalTypeInstance.close()
    }
  }
})
const ModalBrandInstance = useModal({
  component: ModalBrand,
  attrs: {
    onConfirm() {
      ModalBrandInstance.close()
    }
  }
})
const ModalProductInstance = useModal({
  component: ModalProduct,
  attrs: {
    onConfirm() {
      ModalProductInstance.close()
    }
  }
})
</script>

<template>
  <section class="admin">
    <div class="wrapper">
      <div class="adminContainer">
        <h1>Admin Panel</h1>
        <div class="adminContent">
          <div class="adminBlock">
            <button @click="ModalTypeInstance.open">Add type</button>
          </div>
          <div class="adminBlock">
            <button @click="ModalBrandInstance.open">Add Brand</button>
          </div>
          <div class="adminBlock">
            <button @click="ModalProductInstance.open">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
