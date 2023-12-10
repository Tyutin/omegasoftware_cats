import { ProductInCartInterface } from '../../types/product.interface';
import CartItem from '../CartItem/CartItem';

import './CartItemList.scss';

export default function CartItemList(props: {
  products: ProductInCartInterface[];
}) {
  const { products } = props;
  return (
    <ul className="cart-item-list">
      {products.map((product) => {
        return (
          <li className="cart-item-list__element" key={product.id}>
            <CartItem product={product} />
          </li>
        );
      })}
    </ul>
  );
}
