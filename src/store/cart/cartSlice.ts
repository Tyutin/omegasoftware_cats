import { StateCreator } from 'zustand'
import 'zustand/middleware/immer'
import { CartStore } from './types'

export const createCartSlice: StateCreator<CartStore, [['zustand/immer', never] ], [], CartStore> = (set) => ({
  cartProducts:[],
  addProductToCart: (product) => set(
    (state) => {
      state.cartProducts.push({id: product.id, price: product.price, count: 1, addedDate: new Date()})
    }
  ),
  incrementProductInCart: (id) => set(
    (state) => {
      const alreadyProductInCart = state.cartProducts.find(item => item.id === id)
      if(!alreadyProductInCart) {
        return
      }
      alreadyProductInCart.count++
    }
  ),
  decrementProductInCart: (id) => set(
    (state) => {
      const alreadyProductInCart = state.cartProducts.find(item => item.id === id)
      if (!alreadyProductInCart || !alreadyProductInCart.count) {
        return
      } else if (alreadyProductInCart && alreadyProductInCart.count && alreadyProductInCart.count > 1) {
        alreadyProductInCart.count--
      } else if (alreadyProductInCart && alreadyProductInCart.count) {
        const productIndex = state.cartProducts.indexOf(alreadyProductInCart)
        state.cartProducts.splice(productIndex, 1)
      }
    }
  ),
  removeProductFromCart: (id) => set(
    (state) => {
      const alreadyProductInCart = state.cartProducts.find(item => item.id === id)
      if (!alreadyProductInCart || !alreadyProductInCart.count) {
        return
      } else if (alreadyProductInCart && alreadyProductInCart.count) {
        const productIndex = state.cartProducts.indexOf(alreadyProductInCart)
        state.cartProducts.splice(productIndex, 1)
      }
    }
  )
})
