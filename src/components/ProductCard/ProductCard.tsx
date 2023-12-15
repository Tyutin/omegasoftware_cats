import { useBoundStore } from '../../store/useBoundStore';
import { ProductInterface } from '../../types/product.interface';
import Button from '../Button/Button';
import CartItemControls from '../CartItemControls/CartItemControls';
import FavoriteProductControl from '../FavoriteProductControl/FavoriteProductControl';
import ReactLoading from 'react-loading';
import { useImageLoader } from '../../hooks/useImageLoader';
import { getImageLink } from '../../utils/getImageLink';

import './ProductCard.scss';

type ProductCardProps = {
  product: ProductInterface;
  imageSize: number;
};

export default function ProductCard({ product, imageSize }: ProductCardProps) {
  const imageUrl = getImageLink({
    id: product.id,
    type: 'square',
  });
  const productInCart = useBoundStore((state) =>
    state.cartProducts.find((item) => item.id === product.id)
  );
  const productInFavorites = useBoundStore((state) =>
    state.favoriteProducts.find((item) => item.id === product.id)
  );
  const addProductToCart = useBoundStore((state) => state.addItem);
  const openModalHandler = () =>
    useBoundStore.setState({ modalContentData: product });

  const { loading, errorMessage } = useImageLoader({ imageUrl });
  return (
    <div className="product-card">
      <button
        className="product-card__open-modal-button"
        onClick={openModalHandler}
      >
        {!!errorMessage ? (
          <div className="product-card__error-message">
            <span>{errorMessage}</span>
          </div>
        ) : !loading ? (
          <img
            src={imageUrl}
            alt={`Фото котика id=${product.id}`}
            className="product-card__image"
          />
        ) : (
          <ReactLoading
            type="spin"
            width={imageSize}
            height={imageSize}
            color="#12c312"
          />
        )}
      </button>
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
