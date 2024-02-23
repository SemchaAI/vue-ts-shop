<script setup lang="ts">
import { ref, computed } from 'vue'

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const isLogin = computed(() => router.currentRoute.value.name === 'login')
const Title = computed(() => (isLogin.value ? 'Вход' : 'Регистрация'))

const submitHandler = async (email: string, password: string) => {
  if (isLogin.value) {
    await userStore.login(email, password)
  } else {
    await userStore.registration(email, password)
  }
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="login">
    <div class="wrapper">
      <div class="loginContainer">
        <h1>{{ Title }}</h1>
        <form>
          <div class="field">
            <div><label for="email">Почта:</label></div>
            <input v-model="email" value="user@mail.test" type="email" id="email" required />
          </div>

          <div class="field">
            <div><label for="password">Пароль:</label></div>
            <input v-model="password" value="123456" type="password" id="password" required />
          </div>
          <div>
            <div v-if="isLogin">
              Нет аккаунта?
              <RouterLink :to="{ name: 'register' }">Зарегистрируйся</RouterLink>
            </div>
            <div v-else>
              Есть аккаунт?
              <RouterLink :to="{ name: 'login' }">Войди</RouterLink>
            </div>
            <button @click.prevent="submitHandler(email, password)" type="submit">Вход</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login {
  margin-top: 40px;
  color: var(--white);
}
.loginContainer {
}
</style>
