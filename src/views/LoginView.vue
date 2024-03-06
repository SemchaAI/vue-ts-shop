<script setup lang="ts">
import { ref, computed } from 'vue'

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import InputComponent from '@/components/Input/InputComponent.vue'
import MainBtn from '@/components/buttons/MainBtn.vue'
import MainLink from '@/components/links/MainLink.vue'

const router = useRouter()

const userStore = useUserStore()
const cartStore = useCartStore()

const { state } = storeToRefs(userStore)

// const email = ref('')
// const nickname = ref('')
// const password = ref('')

const isLogin = computed(() => router.currentRoute.value.name === 'login')
const dynamicLabel = computed(() => (isLogin.value ? 'Имя/Email' : 'Имя'))
const Title = computed(() => (isLogin.value ? 'Вход' : 'Регистрация'))

const { defineField, isSubmitting, meta, values, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      nickname: string().min(4).max(8).required(),
      password: string().min(4).max(10).required()
    })
  )
})

const [email, emailAttrs] = defineField('email')
const [nickname, nicknameAttrs] = defineField('nickname')
const [password, passwordAttrs] = defineField('password')

const submitHandler = async (email: string, password: string, nickname: string) => {
  if (isLogin.value) {
    await userStore.login(nickname, password)
  } else {
    await userStore.registration(email, password, nickname)
  }

  const cartProducts = await cartStore.getCartProducts(state.value.user.id)
  cartStore.setCartProducts(cartProducts?.data)
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="login">
    <div class="wrapper">
      <div class="loginContainer">
        <h1 class="loginTitle">{{ Title }}</h1>
        <form class="loginForm">
          <div v-if="!isLogin" class="field">
            <div><label class="label" for="email">Почта:</label></div>
            <InputComponent
              class="input"
              v-model="email"
              v-bind="emailAttrs"
              :error="errors.email"
              placeholder="user@mail.test"
              type="email"
              id="email"
              required
            />
          </div>
          <div class="field">
            <div>
              <label class="label" for="name">{{ dynamicLabel }}:</label>
            </div>
            <InputComponent
              :placeholder="dynamicLabel"
              class="input"
              v-model="nickname"
              v-bind="nicknameAttrs"
              :error="errors.nickname"
              type="text"
              id="name"
              required
            />
          </div>
          <div class="field">
            <div><label for="password">Пароль:</label></div>
            <InputComponent
              class="input"
              v-model="password"
              v-bind="passwordAttrs"
              :error="errors.password"
              placeholder="example1234"
              type="password"
              id="password"
              required
            />
          </div>
          <div class="formControls">
            <div class="linkBlock" v-if="isLogin">
              Нет аккаунта?
              <MainLink class="link" to="register">Зарегистрируйся</MainLink>
            </div>
            <div class="linkBlock" v-else>
              Есть аккаунт?
              <MainLink class="link" to="login">Зарегистрируйся</MainLink>
            </div>
            <MainBtn
              version="contain"
              @click.prevent="submitHandler(email, password, nickname)"
              type="submit"
            >
              Вход/Регистрация
            </MainBtn>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.login {
  margin-top: 40px;
  color: var(--tertiary);
}
.loginContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.loginTitle {
  margin: 0 auto;
  @include headline3Typo;
  color: var(--primary);
}
.loginForm {
  margin: 0 auto;
  min-width: 500px;
  display: flex;
  flex-direction: column;
}
.formControls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field {
}
.label {
}
.input {
}
.linkBlock {
}
.link {
}
</style>
