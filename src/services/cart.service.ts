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
  },
  async addOne(userId: string, productId: string) {
    const tmp = await server.post(CART_ROUTE + '/add', {
      userId,
      productId
    })
    console.log(tmp.data)
    return tmp
  },
  async deleteOne(userId: string, productId: string) {
    const tmp = await server.delete(CART_ROUTE + '/delete', {
      data: {
        userId,
        productId
      }
    })
    console.log(tmp.data)
    return tmp
  }
}
