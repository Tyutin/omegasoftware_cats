import { useCartStore } from '../../store/cart/cart';
import { FaTrash } from 'react-icons/fa6';

import './CartItemControls.scss';

export default function CartItemControls(props: {
  productId: string;
  withRemove?: boolean;
}) {
  const { productId, withRemove } = props;
  const productInCart = useCartStore((state) =>
    state.products.find((item) => item.id === productId)
  );
  const incrementItemInCart = useCartStore((state) => state.incrementItem);
  const decrementItemInCart = useCartStore((state) => state.decrementItem);
  const removeItemInCart = useCartStore((state) => state.removeItem);
  return (
    <>
      <div className="cart-item-controls">
        <button
          className="cart-item-controls__counter-button"
          onClick={() => decrementItemInCart(productId)}
        >
          -
        </button>
        <span>{productInCart?.count}</span>
        <button
          className="cart-item-controls__counter-button"
          onClick={() => incrementItemInCart(productId)}
        >
          +
        </button>
      </div>
      {withRemove && (
        <button
          className="cart-item-controls__remove-button"
          onClick={() => removeItemInCart(productId)}
        >
          <FaTrash size={'100%'} color={'#9ea2b7'} />
        </button>
      )}
    </>
  );
}
