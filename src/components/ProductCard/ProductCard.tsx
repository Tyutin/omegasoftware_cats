import { useCartStore } from '../../store/cart/cart';
import { useFavoriteStore } from '../../store/favorite/favorite';
import { ProductInterface } from '../../types/product.interface';
import Button from '../Button/Button';
import CartItemControls from '../CartItemControls/CartItemControls';
import FavoriteProductControl from '../FavoriteProductControl/FavoriteProductControl';

import './ProductCard.scss';

export default function ProductCard(props: { product: ProductInterface }) {
  const { product } = props;
  const imageHref = `https://cataas.com/cat/${product.id}?&type=square`;
  const productInCart = useCartStore((state) =>
    state.products.find((item) => item.id === product.id)
  );
  const productInFavorites = useFavoriteStore((state) =>
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
        {productInCart?.price || productInFavorites?.price || product.price}₽
      </span>
      <FavoriteProductControl product={product} />
      {productInCart ? (
        <CartItemControls productId={product.id} />
      ) : (
        <Button
          text="В корзину"
          clickHandler={() => addProductToCart(product)}
          theme="orange"
        />
      )}
    </div>
  );
}
