<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import { VueFinalModal } from 'vue-final-modal'

import { useProductsStore } from '@/stores/product'

import InputComponent from '../Input/InputComponent.vue'
import MainBtn from '../buttons/MainBtn.vue'

const productsStore = useProductsStore()

const { defineField, isSubmitting, meta, values, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      type: string().min(4).required()
    })
  )
})
const [type, typeAttrs] = defineField('type')

const addType = async () => {
  if (!values.type) return
  const response = await productsStore.createType({ name: values.type })
  console.log('response', response)
  if (!response) {
    emit('confirm')
  }
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
    <h1 class="title">Добавить тип</h1>
    <form class="form" @submit.prevent="addType">
      <div class="field">
        <div><label class="label" for="type">Тип продукта:</label></div>
        <InputComponent
          v-model="type"
          v-bind="typeAttrs"
          :error="errors.type"
          rules="minLength:4"
          placeholder="Введите название типа"
          type="text"
          id="type"
          required
        />
      </div>
      <div class="modalControls">
        <MainBtn :disabled="!meta.valid" type="submit">{{
          isSubmitting ? 'Отправляется...' : 'Отправить'
        }}</MainBtn>
        <MainBtn @click="emit('confirm')">Закрыть</MainBtn>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: center;
  @include headline5Typo;
}
.form {
  @include body2Typo;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.label {
  @include body1Typo;
}

.modalControls {
  display: flex;
  gap: 10px;
}
</style>
