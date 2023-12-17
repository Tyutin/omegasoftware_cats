import { ProductSortingRulesInterface, SortingVariants } from '../types/product.interface';

export const MIN_PRODUCT_PRICE = 100
export const MAX_PRODUCT_PRICE = 2000

export const DEFAULT_PRODUCT_SORTING_RULES: ProductSortingRulesInterface = {
  sortBy: SortingVariants.DEFAULT,
  minPrice: MIN_PRODUCT_PRICE,
  maxPrice: MAX_PRODUCT_PRICE
}