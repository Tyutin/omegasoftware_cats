import { create } from 'zustand'
import { ProductStore } from './types'
import axios, { AxiosError } from 'axios';
import { ProductInterface, ProductResponseInterface } from '../../types/product.interface';
import getRandomPrice from '../../utils/getRandomPrice';



export const useProductStore = create<ProductStore>()(
  (set, get) => ({
    currentPageProducts: [],
    currentPageNumber: 1,
    totalProductsCount: 0,
    productRequestLimit: 20,
    paginationCount: () => Math.ceil(get().totalProductsCount / get().productRequestLimit),
    setCurrentPageNumber: async (newCurrentPageNumber) => {
      let totalProductsCount = get().totalProductsCount

      if (totalProductsCount === 0) {
        try {
          const totalProductsCountResponse = await axios.get<{ count: number }>(
            'https://cataas.com/api/count'
          );
          totalProductsCount = totalProductsCountResponse.data.count
        } catch (error) {
          set({ error: error as AxiosError });
          return;
        }
      }

      if (get().currentPageNumber === newCurrentPageNumber && get().currentPageProducts.length) {
        return
      }


      let currentPageProducts: ProductInterface[]
      try {
        const productsResponse = await axios.get<ProductResponseInterface[]>(
          `https://cataas.com/api/cats?limit=${get().productRequestLimit}&skip=${
            (newCurrentPageNumber - 1) * get().productRequestLimit
          }`
        );
        currentPageProducts = productsResponse.data.map((el) => {
          return {
            id: el._id,
            tags: el.tags,
            price: getRandomPrice(),
          };
        })
      } catch (error) {
        set({ error: error as AxiosError });
        return
      }
      set({currentPageNumber: newCurrentPageNumber, currentPageProducts, totalProductsCount})
    }
  })
)