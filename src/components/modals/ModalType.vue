<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import { VueFinalModal } from 'vue-final-modal'

import { useProductsStore } from '@/stores/product'

import InputComponent from '../Input/InputComponent.vue'
import MainBtn from '../buttons/MainBtn.vue'

const productsStore = useProductsStore()

const error = ref<string | null>(null)

const { defineField, isSubmitting, meta, values, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      type: string().min(4).required()
    })
  )
})
const [type, typeAttrs] = defineField('type')

const addType = async () => {
  const response = await productsStore.createType({ name: values.type })
  console.log('response', response)
  error.value = response
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
        <div>
          <InputComponent
            v-model="type"
            v-bind="typeAttrs"
            rules="minLength:4"
            placeholder="Введите название типа"
            type="text"
            id="type"
            required
          />
          <div v-if="errors.type" class="error">{{ errors.type }}</div>
          <div v-else class="error"></div>
        </div>
      </div>
      <div class="modalControls">
        <MainBtn :disabled="!meta.valid" type="submit">{{
          isSubmitting ? 'Отправляется...' : 'Отправить'
        }}</MainBtn>
        <MainBtn @click="emit('confirm')">Закрыть</MainBtn>
      </div>
    </form>
    <div class="errorComponent" v-if="error">
      <div class="">{{ error }}</div>
      <div class="">Попробуйте обновить страницу</div>
    </div>
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
.error {
  padding-left: 5px;
  display: flex;
  align-items: center;
  color: var(--error);
  height: 24px;
}
.modalControls {
  display: flex;
  gap: 10px;
}
.errorComponent {
  background: var(--background-soft);
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;
  border-radius: 8px;
  color: var(--tertiary);
}
</style>
