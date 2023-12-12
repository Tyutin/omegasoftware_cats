import { StateCreator } from 'zustand'
import { ProductStore } from './types'
import { AxiosError } from 'axios';
import { getProductsForPage, getTotalProductsCount } from './helpers';
import { CartStore } from '../cart/types';
import { FavoriteStore } from '../favorite/types';

export const createProductSlice: StateCreator<ProductStore & CartStore & FavoriteStore , [], [], ProductStore> = (set, get) => ({
  currentPageProducts: [],
  currentPageNumber: 1,
  totalProductsCount: null,
  productRequestLimit: 20,
  paginationCount: () => Math.ceil((get().totalProductsCount || 0) / get().productRequestLimit),
  setCurrentPageNumber: async (newCurrentPageNumber) => {
    let totalProductsCount = get().totalProductsCount

    if (typeof totalProductsCount !== 'number') {
      const totalProductResponseData = await getTotalProductsCount()
      if (totalProductResponseData instanceof AxiosError) {
        set({ productDataError: totalProductResponseData });
        return
      }
      totalProductsCount = totalProductResponseData
    }

    if (get().currentPageNumber === newCurrentPageNumber && get().currentPageProducts.length) {
      return
    }

    const storedProducts = [...get().cartProducts, ...get().favoriteProducts]
    const skip = (newCurrentPageNumber - 1) * get().productRequestLimit
    const limit = get().productRequestLimit

    const currentPageProductsResponseData = await getProductsForPage(skip, limit, storedProducts)
    if (currentPageProductsResponseData instanceof AxiosError) {
      set({ productDataError: currentPageProductsResponseData });
      return
    }
    set({
      currentPageNumber: newCurrentPageNumber,
      totalProductsCount,
      currentPageProducts: currentPageProductsResponseData
    })
  }
})
