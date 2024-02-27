import server from '@/http'
import type { IProduct } from '@/models/IProduct'
import { CART_ROUTE } from '@/utils/consts'
import axios from 'axios'

export type TProductDTO = Omit<IProduct, '_id'>

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const CartService = {
  async getAll(userId: string) {
    console.log(userId)
    const tmp = await server.get(CART_ROUTE, {
      params: {
        userId
      }
    })
    console.log(tmp.data)
    return tmp
  }
}
