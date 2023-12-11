import { create } from 'zustand'
import { ProductStore } from './types'
import { AxiosError } from 'axios';
import { getProductsForPage, getTotalProductsCount } from './helpers';



export const useProductStore = create<ProductStore>()(
  (set, get) => ({
    currentPageProducts: [],
    currentPageNumber: 1,
    totalProductsCount: null,
    productRequestLimit: 20,
    paginationCount: () => Math.ceil(get().totalProductsCount || 0 / get().productRequestLimit),
    setCurrentPageNumber: async (newCurrentPageNumber) => {
      let totalProductsCount = get().totalProductsCount

      if (typeof totalProductsCount !== 'number') {
        const totalProductResponseData = await getTotalProductsCount()
        if (totalProductResponseData instanceof AxiosError) {
          set({ error: totalProductResponseData });
          return
        }
        totalProductsCount = totalProductResponseData
      }

      if (get().currentPageNumber === newCurrentPageNumber && get().currentPageProducts.length) {
        return
      }

      const currentPageProductsResponseData = await getProductsForPage((newCurrentPageNumber - 1) * get().productRequestLimit, get().productRequestLimit)
      if (currentPageProductsResponseData instanceof AxiosError) {
        set({ error: currentPageProductsResponseData });
        return
      }
      set({
        currentPageNumber: newCurrentPageNumber,
        totalProductsCount,
        currentPageProducts: currentPageProductsResponseData
      })
    }
  })
)