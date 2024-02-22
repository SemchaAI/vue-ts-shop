import type { IProduct } from '@/components/productList/product.interface'
import server from '@/http'
import axios from 'axios'

export type TProductDTO = Omit<IProduct, 'id'>

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const ProductService = {
  async getAll() {
    return await server.get<IProduct[]>('/products')
  },
  async create(body: TProductDTO) {
    return axios.post<IProduct>('/product', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  async getOne(id: string) {
    return await server.get<IProduct>(`/products/${id}`)
  }
  // async delete(id: number) {
  //   return axios.delete(`/posts/${id}`)
  // }
}
