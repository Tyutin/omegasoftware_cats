import { useState, useEffect } from 'react';
import { ProductInCartInterface, ProductInterface, ProductSortingRulesInterface, SortingVariants } from '../types/product.interface';

type UseSortedProductsProps<T extends ProductInterface | ProductInCartInterface> = {
  products: T[]
  sortingRules: ProductSortingRulesInterface
}

export default function useSortedProducts<T extends ProductInterface | ProductInCartInterface>(
  {products, sortingRules}: UseSortedProductsProps<T>
): T[] {
  const [sortedProducts, setSortedProducts] = useState(products)

  useEffect(() => {
    const filtredProducts = 
    [...products].filter(el => el.price >= sortingRules.minPrice && el.price <= sortingRules.maxPrice)
    switch (sortingRules.sortBy) {
      case SortingVariants.PRICE_ASC:
        filtredProducts.sort((a,b) => a.price > b.price ? 1 : -1)
        break;
      case SortingVariants.PRICE_DESC:
        filtredProducts.sort((a,b) => a.price > b.price ? -1 : 11)
        break;
      default:
      break
    }
    setSortedProducts(filtredProducts)
  }, [products, sortingRules]);

  return sortedProducts;
};
