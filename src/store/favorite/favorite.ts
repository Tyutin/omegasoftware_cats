import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { FavoriteStore } from './types'

export const useFavoriteStore = create<FavoriteStore>()(
  immer(
    persist((set) => ({
      products:[],
      addProductToFavorites: (product) => set(
        (state) => {
          const alreadyProductInFavorites = state.products.find(item => item.id === product.id)
          if (alreadyProductInFavorites) {
            return
          }
          state.products.push(product)
        }
      ),
      removeProductFromFavorites: (id) => set(
        (state) => {
          const alreadyProductInFavorites = state.products.find(item => item.id === id)
          if (!alreadyProductInFavorites) {
            return
          }
          const productIndex = state.products.indexOf(alreadyProductInFavorites)
          state.products.splice(productIndex, 1)
        }
      ),
    }),
    {
      name: 'favoriteStore'
    })
  )
)