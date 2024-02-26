import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type IProduct, type IType, type IBrand, type ITypeDTO, EStatus } from '@/models/IProduct'
import { AxiosError } from 'axios'
import { ProductService, type TProductDTO } from '@/services/product.service'

export const useProductsStore = defineStore('products', () => {
  const state = ref({
    products: [] as IProduct[],
    brands: [
      { _id: '0', name: 'Все' },
      { _id: '1', name: 'Adidas' }
    ],
    types: [] as IType[],
    selectedType: {
      _id: null
    } as { _id: string | null },
    page: 1,
    total: 1,
    limit: 3,
    status: EStatus.IDLE
  })
  const products = computed(() => state.value.products)
  const page = computed(() => state.value.page)
  const total = computed(() => state.value.total)
  const limit = computed(() => state.value.limit)
  const selectedType = computed(() => state.value.selectedType._id)

  function setProducts(arr: IProduct[]) {
    state.value.products = arr
  }
  function setBrands(arr: IBrand[]) {
    state.value.brands = arr
  }

  async function createProduct(body: TProductDTO) {
    try {
      const response = await ProductService.create(body)
      console.log(response)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }

  async function getAll(brandId, typeId, page, limit) {
    try {
      state.value.status = EStatus.LOADING
      const response = await ProductService.getAll(brandId, typeId, page, limit)
      state.value.status = EStatus.SUCCESS
      console.log(response)
      return response
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }

  // TYPES
  function setTypes(arr: IType[]) {
    state.value.types = arr
  }
  function setSelectedType(type: { _id: string | null }) {
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

  // PAGINATION
  function setTotal(total: number) {
    state.value.total = total
  }
  function setLimit(limit: number) {
    state.value.limit = limit
  }
  function setPage(page: number) {
    state.value.page = page
  }

  return {
    state,
    products,
    page,
    total,
    limit,
    selectedType,
    setProducts,
    setBrands,
    setTypes,
    setSelectedType,
    createType,
    getTypes,
    createProduct,
    getAll,
    setTotal,
    setLimit,
    setPage
  }
})
