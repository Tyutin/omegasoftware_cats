import { Product } from '../../types/product.interface';

export interface ProductInCart extends Omit<Product, 'tags'> {
  count: number
}

export type CartStore = {
  products: ProductInCart[]
  addItem: (product: Product) => void
  decrementItem: (id: string) => void
  incrementItem: (id: string) => void
  removeItem: (id: string) => void
}
