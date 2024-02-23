export interface IProduct {
  _id: string
  title: string
  price: number
  rating: number
  img: string
  typeId: string
  brandId: string
  description: string
  cnt: number
}
export interface IType {
  _id: string
  name: string
}
export interface ITypeDTO extends Omit<IType, '_id'> {}

export interface IBrand {
  _id: string
  name: string
}
