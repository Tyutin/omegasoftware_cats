import { ProductInterface } from '../../types/product.interface';

import './FavoriteProductControl.scss';
import Button from '../Button/Button';
import { useBoundStore } from '../../store/useBoundStore';

export default function FavoriteProductControl(props: {
  product: ProductInterface;
}) {
  const { product } = props;
  const productInFavorites = useBoundStore((state) =>
    state.favoriteProducts.find((el) => el.id === product.id)
  );
  const addProductToFavorites = useBoundStore(
    (state) => state.addProductToFavorites
  );
  const removeProductFromFavorites = useBoundStore(
    (state) => state.removeProductFromFavorites
  );
  const clickHandler = () =>
    productInFavorites
      ? removeProductFromFavorites(product.id)
      : addProductToFavorites(product);
  return (
    <div className="favorite-controls">
      <Button
        text={productInFavorites ? 'В избранном' : 'В избранное'}
        clickHandler={clickHandler}
        theme={productInFavorites ? 'blue' : null}
        additionalClasses="favorite-controls__button"
      />
    </div>
  );
}
