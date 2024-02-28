import './assets/main.scss'
import 'vue-final-modal/style.css'
import 'animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createVfm } from 'vue-final-modal'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(autoAnimatePlugin)
app.use(createVfm())

app.mount('#app')
