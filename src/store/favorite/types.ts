import { ProductInterface, ProductInFavoritesInterface } from '../../types/product'

export type FavoriteState = {
  favoriteProducts: ProductInFavoritesInterface[]
}

export type FavoriteActions = {
  addProductToFavorites: (product: ProductInterface) => void;
  removeProductFromFavorites: (id: string) => void;
}

export type FavoriteStore = FavoriteState & FavoriteActions