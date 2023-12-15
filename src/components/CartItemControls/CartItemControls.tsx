import { FaTrash } from 'react-icons/fa6';

import './CartItemControls.scss';
import { useBoundStore } from '../../store/useBoundStore';
import classNames from 'classnames';

type CartItemControlsProps = {
  productId: string;
  withRemove?: boolean;
};

export default function CartItemControls({
  productId,
  withRemove,
}: CartItemControlsProps) {
  const productInCart = useBoundStore((state) =>
    state.cartProducts.find((item) => item.id === productId)
  );
  const incrementItemInCart = useBoundStore((state) => state.incrementItem);
  const decrementItemInCart = useBoundStore((state) => state.decrementItem);
  const removeItemInCart = useBoundStore((state) => state.removeItem);
  return (
    <div className="cart-item-controls">
      <div
        className={classNames(
          'cart-item-controls__counter-wrapper',
          !withRemove && 'cart-item-controls__counter-wrapper_full-width'
        )}
      >
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
    </div>
  );
}
