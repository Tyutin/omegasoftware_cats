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
  const incrementItemInCart = useBoundStore(
    (state) => state.incrementProductInCart
  );
  const decrementItemInCart = useBoundStore(
    (state) => state.decrementProductInCart
  );
  const removeProductFromCart = useBoundStore(
    (state) => state.removeProductFromCart
  );
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
          onClick={() => removeProductFromCart(productId)}
        >
          <FaTrash size={'100%'} color={'#9ea2b7'} />
        </button>
      )}
    </div>
  );
}
