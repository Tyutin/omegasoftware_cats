import { ProductInCartInterface, ProductInterface } from '../../types/product.interface'

export type CartStore = {
  products: ProductInCartInterface[]
  addItem: (product: ProductInterface) => void
  decrementItem: (id: string) => void
  incrementItem: (id: string) => void
  removeItem: (id: string) => void
}
