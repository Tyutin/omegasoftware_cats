import { useCartStore } from '../../store/cart/cart';
import { Product } from '../../types/product.interface';
import CartItemControls from '../CartItemControls/CartItemControls';

import './ProductCard.scss';

export default function ProductCard(props: { product: Product }) {
  const { product } = props;
  const imageHref = `https://cataas.com/cat/${product.id}?&type=square`;
  const productInCart = useCartStore((state) =>
    state.products.find((item) => item.id === product.id)
  );
  const addProductToCart = useCartStore((state) => state.addItem);
  return (
    <div className="product-card">
      <img
        src={imageHref}
        alt={`Фото котика id=${product.id}`}
        className="product-card__image"
      />
      <span className="product-card__price">
        Цена: {productInCart?.price || product.price}₽
      </span>
      {productInCart ? (
        <CartItemControls productId={product.id} />
      ) : (
        <button
          className="product-card__add-to-cart"
          onClick={() => addProductToCart(product)}
        >
          В корзину
        </button>
      )}
    </div>
  );
}
