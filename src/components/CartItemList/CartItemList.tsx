import { ProductInCartInterface } from '../../types/product';
import CartItem from '../CartItem/CartItem';

import './CartItemList.scss';

type CartItemListProps = {
  products: ProductInCartInterface[];
};

export default function CartItemList({ products }: CartItemListProps) {
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
