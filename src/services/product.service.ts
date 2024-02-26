import type { IProduct, IProductList } from '@/components/productList/product.interface'
import server from '@/http'
import type { ITypeDTO, IType } from '@/models/IProduct'
import { PRODUCT_ROUTE, PRODUCT_ROUTE_TYPE } from '@/utils/consts'
import axios from 'axios'

export type TProductDTO = Omit<IProduct, '_id'>

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const ProductService = {
  async getAll(brandId, typeId, page, limit = 6) {
    const tmp = await server.get<IProductList>(PRODUCT_ROUTE, {
      params: {
        brandId,
        typeId,
        limit,
        page
      }
    })
    console.log(tmp.data)
    return tmp
  },
  async create(body: TProductDTO) {
    return axios.post<TProductDTO>(PRODUCT_ROUTE, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('auth')}`
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
