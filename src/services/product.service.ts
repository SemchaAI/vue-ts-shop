import type { IProduct, IProductList } from '@/components/productList/product.interface'
import server from '@/http'
import type { ITypeDTO, IType } from '@/models/IProduct'
import { PRODUCT_ROUTE, PRODUCT_ROUTE_TYPE } from '@/utils/consts'
import axios from 'axios'

export type TProductDTO = Omit<IProduct, 'id'>

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const ProductService = {
  async getAll() {
    return await server.get<IProductList>(PRODUCT_ROUTE)
  },
  async create(body: TProductDTO) {
    return axios.post<IProduct>(PRODUCT_ROUTE, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  async getOne(id: string) {
    return await server.get<IProduct>(PRODUCT_ROUTE + '/' + id)
  },
  // TYPES

  async createType(type: ITypeDTO) {
    return await server.post<ITypeDTO>(PRODUCT_ROUTE_TYPE, type)
  },
  async getTypes() {
    return await server.get<IType[]>(PRODUCT_ROUTE_TYPE)
  }
  // INFOS
}
