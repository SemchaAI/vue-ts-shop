<script lang="ts" setup>
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const email = ref('')
const password = ref('')
</script>

<template>
  <section class="register">
    <div class="wrapper">
      <div class="registerContainer">
        <form>
          <div class="field">
            <div><label for="email">Почта:</label></div>
            <input v-model="email" value="user@mail.test" type="email" id="email" required />
          </div>

          <div class="field">
            <div><label for="password">Пароль:</label></div>
            <input v-model="password" value="123456" type="password" id="password" required />
          </div>

          <button @click.prevent="userStore.registration(email, password)" type="submit">
            Вход
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.register {
  margin-top: 40px;
  color: var(--white);
}
.registerContainer {
}
</style>
