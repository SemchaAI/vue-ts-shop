<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { ref } from 'vue'
import { useProductsStore } from '@/stores/product'

const productsStore = useProductsStore()
const input = ref('')

const addType = async () => {
  try {
    await productsStore.createType({ name: input.value })
    emit('confirm')
  } catch (error) {
    console.log(error)
  }
}

// defineProps<{
//   title?: string
// }>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>Добавить тип</h1>
    <form>
      <div class="field">
        <div><label for="type">Тип продукта:</label></div>
        <input v-model="input" placeholder="Введите название типа" type="еу" id="type" required />
      </div>
    </form>
    <div class="ModalControls">
      <button @click="addType">Добавить</button>
      <button @click="emit('confirm')">Закрыть</button>
    </div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
