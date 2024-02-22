import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct, IType, IBrand } from '@/models/IProduct'

export const useProductsStore = defineStore('products', () => {
  const state = ref({
    products: [
      {
        _id: '0',
        title: 'Название',
        price: 0,
        rating: 0,
        img: 'https://picsum.photos/200/300',
        typeId: '0',
        brandId: '0',
        description: 'Описание',
        cnt: 0
      },
      {
        _id: '1',
        title: 'Название1',
        price: 1,
        rating: 1,
        img: 'https://picsum.photos/200/300',
        typeId: '1',
        brandId: '1',
        description: 'Описание',
        cnt: 0
      },
      {
        _id: '2',
        title: 'Название2',
        price: 2,
        rating: 2,
        img: 'https://picsum.photos/200/300',
        typeId: '2',
        brandId: '2',
        description: 'Описание',
        cnt: 0
      },
      {
        _id: '3',
        title: 'Название3',
        price: 3,
        rating: 3,
        img: 'https://picsum.photos/200/300',
        typeId: '3',
        brandId: '3',
        description: 'Описание',
        cnt: 0
      }
    ],
    brands: [
      { _id: '0', name: 'Все' },
      { _id: '1', name: 'Adidas' }
    ],
    types: [
      { _id: '0', name: 'Все' },
      { _id: '1', name: 'Мужские' }
    ]
  })
  function setProducts(arr: IProduct[]) {
    state.value.products = arr
  }
  function setBrands(arr: IBrand[]) {
    state.value.brands = arr
  }
  function setTypes(arr: IType[]) {
    state.value.types = arr
  }

  return { state, setProducts, setBrands, setTypes }
})
