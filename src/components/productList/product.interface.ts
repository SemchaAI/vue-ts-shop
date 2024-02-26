import type { IInfo, IProduct } from '@/models/IProduct'

export interface IProductList {
  products: IProduct[]
  total: number
  page: number
}
export type OmittedProductList = Omit<IProductList, 'total' | 'page'>

// export interface IProduct {
//   _id: number
//   title: string
//   description: string
//   img: string
//   cnt: number
//   price: number
//   typeId: string
//   info: IInfo[]
// }
