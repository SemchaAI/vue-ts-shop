export interface IProductList {
  products: IProduct[]
  total: number
  page: number
}

export interface IProduct {
  _id: number
  title: string
  description: string
  imgLink: string
  cnt: number
  price: number
}
