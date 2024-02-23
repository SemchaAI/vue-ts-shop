import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct, IType, IBrand, ITypeDTO } from '@/models/IProduct'
import { AxiosError } from 'axios'
import { ProductService } from '@/services/product.service'

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
    types: [] as IType[],
    selectedType: {
      _id: '0'
    }
  })
  function setProducts(arr: IProduct[]) {
    state.value.products = arr
  }
  function setBrands(arr: IBrand[]) {
    state.value.brands = arr
  }

  // TYPES
  function setTypes(arr: IType[]) {
    state.value.types = arr
  }
  function setSelectedType(type: IType) {
    state.value.selectedType = type
  }

  // TYPES ASYNC
  async function createType(type: ITypeDTO) {
    try {
      const response = await ProductService.createType(type)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }
  async function getTypes() {
    try {
      const response = await ProductService.getTypes()
      setTypes(response.data)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }

  return { state, setProducts, setBrands, setTypes, setSelectedType, createType, getTypes }
})
