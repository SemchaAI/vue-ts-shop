<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalType from '@/components/modals/ModalType.vue'
import ModalBrand from '@/components/modals/ModalBrand.vue'
import ModalProduct from '@/components/modals/ModalProduct.vue'
import MainBtn from '@/components/buttons/MainBtn.vue'

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
        <h1 class="adminTitle">Admin Panel</h1>
        <div class="adminContent">
          <div class="adminBlock">
            <MainBtn version="contain" @click="ModalTypeInstance.open">Add type</MainBtn>
          </div>
          <div class="adminBlock">
            <MainBtn disabled version="contain" @click="ModalBrandInstance.open">Add Brand</MainBtn>
          </div>
          <div class="adminBlock">
            <MainBtn version="contain" @click="ModalProductInstance.open">Add Product</MainBtn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin {
  margin-top: 40px;
}
.adminTitle {
  text-align: center;
}
.adminContent {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.adminBlock {
  display: flex;
}
</style>
