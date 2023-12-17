import { ProductInCartInterface } from '../../types/product';
import CartItemControls from '../CartItemControls/CartItemControls';

import './CartItem.scss';

type CartItemProps = {
  product: ProductInCartInterface;
};

export default function CartItem({ product }: CartItemProps) {
  const { id, price, count } = product;
  const imageHref = `https://cataas.com/cat/${id}?&type=square`;
  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <img
          className="cart-item__image"
          src={imageHref}
          alt={`Фото котика id=${id}`}
        />
      </div>
      <div className="cart-item__controls">
        <span className="cart-item__total-price">{count * price}₽</span>
        <CartItemControls productId={id} withRemove={true} />
      </div>
    </div>
  );
}
