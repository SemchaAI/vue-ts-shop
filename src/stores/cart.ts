import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/models/IProduct'
import { CartService } from '@/services/cart.service'
import { AxiosError } from 'axios'

export const useCartStore = defineStore('cart', () => {
  const state = ref({
    items: [] as IProduct[],
    total: 0
  })
  // const userId = computed(() => user.state.user.id)
  const items = computed(() => state.value.items)

  function setCartProducts(arr) {
    state.value.items = arr
  }

  async function getCartProducts(userId: string) {
    try {
      const response = await CartService.getAll(userId)
      return response
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }

  return { state, items, getCartProducts, setCartProducts }
})
