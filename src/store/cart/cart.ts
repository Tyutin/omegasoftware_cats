import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { CartStore } from './types'

export const useCartStore = create<CartStore>()(
  immer(
    persist((set) => ({
      products:[],
      addItem: (product) => set(
        (state) => {
          state.products.push({id: product.id, price: product.price, count: 1})
        }
      ),
      incrementItem: (id) => set(
        (state) => {
          const alreadyProductInCart = state.products.find(item => item.id === id)
          if(!alreadyProductInCart) {
            return
          }
          alreadyProductInCart.count++
        }
      ),
      decrementItem: (id) => set(
        (state) => {
          const alreadyProductInCart = state.products.find(item => item.id === id)
          if (!alreadyProductInCart || !alreadyProductInCart.count) {
            return
          } else if (alreadyProductInCart && alreadyProductInCart.count && alreadyProductInCart.count > 1) {
            alreadyProductInCart.count--
          } else if (alreadyProductInCart && alreadyProductInCart.count) {
            const productIndex = state.products.indexOf(alreadyProductInCart)
            state.products.splice(productIndex, 1)
          }
        }
      ),
      removeItem: (id) => set(
        (state) => {
          const alreadyProductInCart = state.products.find(item => item.id === id)
          if (!alreadyProductInCart || !alreadyProductInCart.count) {
            return
          } else if (alreadyProductInCart && alreadyProductInCart.count) {
            const productIndex = state.products.indexOf(alreadyProductInCart)
            state.products.splice(productIndex, 1)
          }
        }
      ),
    }),
    {
      name: 'cartStore'
    })
  )
)