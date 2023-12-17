import { StateCreator } from 'zustand'
import 'zustand/middleware/immer'
import { FavoriteStore } from './types'

export const createFavoriteSlice: StateCreator<FavoriteStore, [['zustand/immer', never]], [], FavoriteStore> = (set) => ({
  favoriteProducts:[],
  addProductToFavorites: (product) => set(
    (state) => {
      const alreadyProductInFavorites = state.favoriteProducts.find(item => item.id === product.id)
      if (alreadyProductInFavorites) {
        return
      }
      state.favoriteProducts.push({...product, addedDate: new Date()})
    }
  ),
  removeProductFromFavorites: (id) => set(
    (state) => {
      const alreadyProductInFavorites = state.favoriteProducts.find(item => item.id === id)
      if (!alreadyProductInFavorites) {
        return
      }
      const productIndex = state.favoriteProducts.indexOf(alreadyProductInFavorites)
      state.favoriteProducts.splice(productIndex, 1)
    }
  ),
})
