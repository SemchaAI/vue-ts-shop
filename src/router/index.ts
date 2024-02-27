import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import E404ViewVue from '@/views/E404View.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product',
      props: true,
      component: () => import('@/views/ProductView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // beforeEnter: (to, from, next) => {
      //   console.log(useUserStore().isLogin)
      //   useUserStore().isLogin ? next({ name: 'home' }) : next()
      // },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      beforeEnter: (to, from, next) => {
        !useUserStore().isLogin ? next({ name: 'login' }) : next()
      },
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: (to, from, next) => {
        useUserStore().isAdmin ? next() : next({ name: 'login' })
      },
      component: () => import('@/views/AdminView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/OrderView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      component: E404ViewVue
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  if (to.meta.auth && !user.isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
