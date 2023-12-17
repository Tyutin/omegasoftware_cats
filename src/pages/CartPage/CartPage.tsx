import { useState } from 'react';
import CartItemList from '../../components/CartItemList/CartItemList';
import { useBoundStore } from '../../store/useBoundStore';

import './CartPage.scss';
import { ProductSortingRulesInterface } from '../../types/product';
import { DEFAULT_PRODUCT_SORTING_RULES } from '../../constants/product';
import useSortedProducts from '../../hooks/useSortedProducts';
import ProductSort from '../../components/ProductSort/ProductSort';

export default function CartPage() {
  const cartProducts = useBoundStore((state) => state.cartProducts);
  const totalCartPrice = cartProducts.reduce((acc, curr) => {
    return acc + curr.count * curr.price;
  }, 0);

  const [sortingRules, setSortingRules] =
    useState<ProductSortingRulesInterface>(DEFAULT_PRODUCT_SORTING_RULES);

  const sortedProducts = useSortedProducts({
    products: cartProducts,
    sortingRules,
  });
  return (
    <div className="page cart-page">
      {cartProducts.length ? (
        <>
          <div className="main-page__filters">
            <ProductSort
              sortingRules={sortingRules}
              setSortingRules={setSortingRules}
              withDateSort={true}
            />
          </div>
          <CartItemList products={sortedProducts} />
          <span className="cart-page__total-price">
            Сумма заказа:{' '}
            <span className="cart-page__total-price-number">
              {totalCartPrice}₽
            </span>
          </span>
        </>
      ) : (
        <span>Корзина пуста</span>
      )}
    </div>
  );
}
