import CartItemList from '../../components/CartItemList/CartItemList';
import { useBoundStore } from '../../store/useBoundStore';

import './CartPage.scss';

export default function CartPage() {
  const products = useBoundStore((state) => state.cartProducts);
  const totalCartPrice = products.reduce((acc, curr) => {
    return acc + curr.count * curr.price;
  }, 0);
  return (
    <div className="page cart-page">
      <CartItemList products={products} />
      <span className="cart-page__total-price">
        Сумма заказа:{' '}
        <span className="cart-page__total-price-number">{totalCartPrice}₽</span>
      </span>
    </div>
  );
}
