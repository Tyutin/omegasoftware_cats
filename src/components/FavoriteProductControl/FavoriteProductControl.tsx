import { ProductInterface } from '../../types/product.interface';
import { useFavoriteStore } from '../../store/favorite/favorite';

import './FavoriteProductControl.scss';
import Button from '../Button/Button';

export default function FavoriteProductControl(props: {
  product: ProductInterface;
}) {
  const { product } = props;
  const productInFavorites = useFavoriteStore((state) =>
    state.products.find((el) => el.id === product.id)
  );
  const addProductToFavorites = useFavoriteStore(
    (state) => state.addProductToFavorites
  );
  const removeProductFromFavorites = useFavoriteStore(
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
