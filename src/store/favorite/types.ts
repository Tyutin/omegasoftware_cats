import { ProductInterface } from '../../types/product.interface'

export type FavoriteStore = {
  products: ProductInterface[]
  addProductToFavorites: (product: ProductInterface) => void;
  removeProductFromFavorites: (id: string) => void;
}