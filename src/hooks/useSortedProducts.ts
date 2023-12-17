import { useState, useEffect } from 'react';
import { ProductInCartInterface, ProductInFavoritesInterface, ProductInterface, ProductSortingRulesInterface, SortingVariants } from '../types/product';

type UseSortedProductsProps<T extends ProductInterface | ProductInCartInterface | ProductInFavoritesInterface> = {
  products: T[]
  sortingRules: ProductSortingRulesInterface
}

export default function useSortedProducts<T extends ProductInterface | ProductInCartInterface | ProductInFavoritesInterface>(
  {products, sortingRules}: UseSortedProductsProps<T>
): T[] {
  const [sortedProducts, setSortedProducts] = useState(products)

  useEffect(() => {
    const filteredProducts: T[] = 
    [...products].filter(el => el.price >= sortingRules.minPrice && el.price <= sortingRules.maxPrice)
    switch (sortingRules.sortBy) {
      case SortingVariants.PRICE_ASC:
        filteredProducts.sort((a,b) => a.price - b.price)
        break;
      case SortingVariants.PRICE_DESC:
        filteredProducts.sort((a,b) => b.price - a.price)
        break;
      case SortingVariants.DATE_ASC:
        filteredProducts.sort((a,b) => (a.addedDate?.getTime() || 0) - (b.addedDate?.getTime() || 0))
        break;
      case SortingVariants.DATE_DESC:
        filteredProducts.sort((a,b) => (b.addedDate?.getTime() || 0) - (a.addedDate?.getTime() || 0))
        break;
      default:
      break
    }
    setSortedProducts(filteredProducts)
  }, [products, sortingRules]);

  return sortedProducts;
};
