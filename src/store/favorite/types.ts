import { ProductInterface } from '../../types/product.interface'

export type FavoriteState = {
  favoriteProducts: ProductInterface[]
}

export type FavoriteActions = {
  addProductToFavorites: (product: ProductInterface) => void;
  removeProductFromFavorites: (id: string) => void;
}

export type FavoriteStore = FavoriteState & FavoriteActions