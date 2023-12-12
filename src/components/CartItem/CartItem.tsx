import { ProductInCartInterface } from '../../types/product.interface';
import CartItemControls from '../CartItemControls/CartItemControls';

import './CartItem.scss';

export default function CartItem(props: { product: ProductInCartInterface }) {
  const { product } = props;
  const imageHref = `https://cataas.com/cat/${product.id}?&type=square`;
  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={imageHref}
        alt={`Фото котика id=${product.id}`}
      />
      <span className="cart-item__total-price">
        {product.count * product.price}₽
      </span>
      <CartItemControls productId={product.id} withRemove={true} />
    </div>
  );
}
