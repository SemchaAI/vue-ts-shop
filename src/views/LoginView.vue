<script setup lang="ts">
import { ref } from 'vue'
// import { useMutation } from '@tanstack/vue-query'
// import { UserService } from '@/services/user.service'

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')

// const User = reactive({
//   email: '',
//   password: ''
// })

// const { mutate: loginUser, isLoading } = useMutation({
//   mutationKey: ['createUser'],
//   mutationFn: (body: IUser) => UserService.login(body.email, body.password)
// })
const loginHandler = async (email: string, password: string) => {
  await userStore.login(email, password)
  if (userStore.isLogin) {
    console.log(userStore.isLogin)
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <section class="login">
    <div class="wrapper">
      <div class="loginContainer">
        <form>
          <div class="field">
            <div><label for="email">Почта:</label></div>
            <input v-model="email" value="user@mail.test" type="email" id="email" required />
          </div>

          <div class="field">
            <div><label for="password">Пароль:</label></div>
            <input v-model="password" value="123456" type="password" id="password" required />
          </div>

          <button @click.prevent="loginHandler(email, password)" type="submit">Вход</button>
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
