<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { useProductsStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import type { IType } from '@/models/IProduct'
const productStore = useProductsStore()
const { state } = storeToRefs(productStore)
// const brands = state.value.brands
let types = ref<IType[]>([])

// Why interface here? Send to models next time
interface InfoItem {
  title: string
  description: string
  number: number
}

let info = ref<InfoItem[]>([])

let name = ref('')
let description = ref('')
let price = ref(0)
let cnt = ref(0)
let file = ref<File>()

let type = ref('')

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
const selectFile = (e: any) => {
  file.value = e.target.files[0]
}
const changeInfo = (key: string, event: Event, number: number) => {
  const value = (event.target as HTMLInputElement).value
  info.value = info.value.map((item) => (item.number === number ? { ...item, [key]: value } : item))
  console.log(info.value)
}
const addDevice = () => {
  let data = new FormData()
  data.append('title', name.value)
  data.append('description', description.value)
  data.append('price', String(price.value))
  data.append('cnt', String(cnt.value))
  data.append('img', file.value as File)
  data.append('info', JSON.stringify(info.value))
  data.append('typeId', productStore.state.selectedType._id)

  productStore.createProduct(data)
}

const selectType = () => {
  productStore.setSelectedType({ _id: type.value })
  console.log(state.value.selectedType)
}

onMounted(async () => {
  await productStore.getTypes()
  types.value = state.value.types
})

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
        <select @change="selectType" v-model="type" id="type" name="type">
          <option v-for="data in types" class="option" :value="data._id" :key="data._id">
            {{ data.name }}
          </option>
        </select>
      </div>
      <!-- <div>
        <label for="brand">Выберите Брэнд:</label>
        <select id="brand" name="brand">
          <option class="option" :key="brand._id" v-for="brand in brands" :value="brand._id">
            {{ brand.name }}
          </option>
        </select>
      </div> -->
      <div class="field">
        <div><label for="title">Название продукта:</label></div>
        <input v-model="name" placeholder="Введите название продукта" id="title" required />
      </div>
      <div class="field">
        <div><label for="price">Цена продукта:</label></div>
        <input v-model="price" placeholder="Введите цену" id="price" required />
      </div>
      <div class="field">
        <div><label for="cnt">Задай кол-во на складе:</label></div>
        <input v-model="cnt" type="number" placeholder="кол-во 1,2,3" id="cnt" required />
      </div>
      <div class="field">
        <div><label for="description">Краткое описание:</label></div>
        <input v-model="description" placeholder="описание" id="description" required />
      </div>
      <div class="field">
        <div><label for="img">Главное изображение:</label></div>
        <input @change="selectFile" type="file" id="img" required />
      </div>
      <hr />
      <button @click.prevent="addInfo">Добавить новое свойство</button>
      <div v-if="info.length > 0">
        <div :key="data.number" v-for="data in info" class="field">
          <input
            @change="changeInfo('title', $event, data.number)"
            :value="data.title"
            placeholder="название свойства"
            required
          />
          <input
            @change="changeInfo('description', $event, data.number)"
            :value="data.description"
            placeholder="описание свойства"
            required
          />
        </div>
        <button @click.prevent="removeInfo">Удалить характеристику</button>
      </div>
    </form>
    <div class="ModalControls">
      <button type="submit" @click.prevent="addDevice">Добавить</button>
      <button @click.prevent="emit('confirm')">Закрыть</button>
    </div>
  </VueFinalModal>
</template>
