import { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import useSortedProducts from '../../hooks/useSortedProducts';
import { useBoundStore } from '../../store/useBoundStore';
import './FavoritesPage.scss';
import { ProductSortingRulesInterface } from '../../types/product.interface';
import { DEFAULT_PRODUCT_SORTING_RULES } from '../../constants/product';
import ProductSort from '../../components/ProductSort/ProductSort';
export default function FavoritesPage() {
  const favoriteProducts = useBoundStore((state) => state.favoriteProducts);

  const [sortingRules, setSortingRules] =
    useState<ProductSortingRulesInterface>(DEFAULT_PRODUCT_SORTING_RULES);

  const sortedProducts = useSortedProducts({
    products: favoriteProducts,
    sortingRules,
  });

  return (
    <div className="page favorites-page">
      {favoriteProducts.length ? (
        <>
          <div className="main-page__filters">
            <ProductSort
              sortingRules={sortingRules}
              setSortingRules={setSortingRules}
              withPriceFilter={true}
            />
          </div>
          <ProductList products={sortedProducts} />
        </>
      ) : (
        <span>Список избранного пуст</span>
      )}
    </div>
  );
}
