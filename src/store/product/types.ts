import { AxiosError } from 'axios'
import { ProductInterface } from '../../types/product.interface'

export type ProductStore = {
  currentPageProducts: ProductInterface[]
  currentPageNumber: number
  totalProductsCount: number | null
  productRequestLimit: number
  paginationCount: () => number
  setCurrentPageNumber: (newCurrentPageNumber: number) => void
  error?: AxiosError
}