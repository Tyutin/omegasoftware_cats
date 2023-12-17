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

  const { discountApplied, discountedPrice } =
    calculateDiscount(totalCartPrice);

  const [sortingRules, setSortingRules] =
    useState<ProductSortingRulesInterface>(DEFAULT_PRODUCT_SORTING_RULES);

  const sortedProducts = useSortedProducts({
    products: cartProducts,
    sortingRules,
  });

  if (!cartProducts.length) {
    return (
      <div className="page cart-page">
        <span>Корзина пуста</span>
      </div>
    );
  }
  return (
    <div className="page cart-page">
      <div className="main-page__filters">
        <ProductSort
          sortingRules={sortingRules}
          setSortingRules={setSortingRules}
          withDateSort={true}
        />
      </div>
      <CartItemList products={sortedProducts} />
      <div className="cart-page__total-price">
        {!!discountApplied && (
          <>
            <span>
              Сумма заказа:{' '}
              <span className="cart-page__total-price__accent-text">
                {totalCartPrice}₽
              </span>
            </span>
            <span>
              Скидка:{' '}
              <span className="cart-page__total-price-number cart-page__total-price-number">
                {discountApplied}%
              </span>
            </span>
          </>
        )}
        <span>
          {discountApplied ? 'Итого ' : 'Сумма заказа '}
          <span className="cart-page__total-price-number cart-page__total-price-number_focus">
            {discountedPrice}₽
          </span>
        </span>
      </div>
    </div>
  );
}

const calculateDiscount = (
  price: number
): { discountedPrice: number; discountApplied: number } => {
  let discount = 0;
  if (price > 3000) {
    discount = Math.min(20, Math.floor(price / 3000));
  }
  const discountedPrice = Math.ceil(price - (price * discount) / 100);
  return { discountedPrice, discountApplied: discount };
};
