import { ProductInCartInterface, ProductInterface } from '../../types/product'

export type CartState = {
  cartProducts: ProductInCartInterface[]
}

export type CartActions = {
  addProductToCart: (product: ProductInterface) => void
  decrementProductInCart: (id: string) => void
  incrementProductInCart: (id: string) => void
  removeProductFromCart: (id: string) => void
}

export type CartStore = CartState & CartActions
