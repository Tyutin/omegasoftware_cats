import { ProductInCartInterface, ProductInterface } from '../../types/product.interface'

export type CartState = {
  cartProducts: ProductInCartInterface[]
}

export type CartActions = {
  addItem: (product: ProductInterface) => void
  decrementItem: (id: string) => void
  incrementItem: (id: string) => void
  removeItem: (id: string) => void
}

export type CartStore = CartState & CartActions
