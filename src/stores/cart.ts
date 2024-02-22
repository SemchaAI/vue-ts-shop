import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/components/productList/product.interface'

export const useCartStore = defineStore('cart', () => {
  const state = ref({
    items: [] as IProduct[],
    total: 0
  })

  return { state }
})
