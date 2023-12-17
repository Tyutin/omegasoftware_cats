import { AxiosError } from 'axios'
import { ProductInterface } from '../../types/product'

export type ProductState = {
  currentPageProducts: ProductInterface[]
  currentPageNumber: number
  totalProductsCount: number | null
  productRequestLimit: number
  productDataError?: AxiosError
}

export type ProductActions = {
  paginationCount: () => number
  setCurrentPageNumber: (newCurrentPageNumber: number) => void
}

export type ProductStore = ProductState & ProductActions