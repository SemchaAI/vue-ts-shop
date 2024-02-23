<script setup lang="ts">
import { ref } from 'vue'

import { VueFinalModal } from 'vue-final-modal'

import { useProductsStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const productStore = useProductsStore()
const { state } = storeToRefs(productStore)

const brands = state.value.brands
const types = state.value.types

interface InfoItem {
  title: string
  description: string
  number: number
}

const info = ref<InfoItem[]>([])

const addInfo = () => {
  info.value.push({
    title: '',
    description: '',
    number: Date.now()
  })
}
const removeInfo = () => {
  info.value.pop()
}

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
      <div>
        <label for="type">Выберите Тип:</label>
        <select id="type" name="type">
          <option v-for="type in types" class="option" :value="type._id" :key="type._id">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="brand">Выберите Брэнд:</label>
        <select id="brand" name="brand">
          <option class="option" :key="brand._id" v-for="brand in brands" :value="brand._id">
            {{ brand.name }}
          </option>
        </select>
      </div>
      <div class="field">
        <div><label for="title">Название продукта:</label></div>
        <input placeholder="Введите название продукта" id="title" required />
      </div>
      <div class="field">
        <div><label for="price">Цена продукта:</label></div>
        <input placeholder="Введите цену" id="price" required />
      </div>
      <div class="field">
        <div><label for="cnt">Задай кол-во на складе:</label></div>
        <input type="number" placeholder="кол-во 1,2,3" id="cnt" required />
      </div>
      <div class="field">
        <div><label for="description">Краткое описание:</label></div>
        <input placeholder="описание" id="description" required />
      </div>
      <div class="field">
        <div><label for="img">Главное изображение:</label></div>
        <input type="file" id="img" required />
      </div>
      <hr />
      <button @click.prevent="addInfo">Добавить новое свойство</button>
      <div v-if="info.length > 0">
        <div :key="data.number" v-for="data in info" class="field">
          <input placeholder="название свойства" required />
          <input placeholder="описание свойства" required />
          <button @click.prevent="removeInfo">Удалить характеристику</button>
        </div>
      </div>
    </form>
    <div class="ModalControls">
      <button @click="emit('confirm')">Добавить</button>
      <button @click.prevent="emit('confirm')">Закрыть</button>
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
