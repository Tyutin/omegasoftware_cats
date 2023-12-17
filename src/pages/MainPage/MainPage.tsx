import ProductList from '../../components/ProductList/ProductList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../components/Pagination/Pagination';
import { useBoundStore } from '../../store/useBoundStore';

import './MainPage.scss';
import { useState } from 'react';
import { ProductSortingRulesInterface } from '../../types/product';
import useSortedProducts from '../../hooks/useSortedProducts';
import ProductSort from '../../components/ProductSort/ProductSort';
import { DEFAULT_PRODUCT_SORTING_RULES } from '../../constants/product';

export default function MainPage() {
  const currentPageProducts = useBoundStore(
    (state) => state.currentPageProducts
  );
  const error = useBoundStore((state) => state.productDataError);

  const [sortingRules, setSortingRules] =
    useState<ProductSortingRulesInterface>(DEFAULT_PRODUCT_SORTING_RULES);

  const sortedProducts = useSortedProducts({
    products: currentPageProducts,
    sortingRules,
  });

  if (error) {
    return (
      <div className="page main-page">
        <ErrorMessage
          error={error}
          alertText="Произошла ошибка загрузки данных"
        />
      </div>
    );
  }

  return (
    <div className="page main-page">
      <div className="main-page__filters">
        <ProductSort
          sortingRules={sortingRules}
          setSortingRules={setSortingRules}
          withPriceFilter={true}
        />
      </div>
      <ProductList products={sortedProducts} />
      <Pagination />
    </div>
  );
}
