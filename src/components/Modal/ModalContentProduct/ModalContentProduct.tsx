import { ProductInterface } from '../../../types/product';
import ReactLoading from 'react-loading';

import './ModalContentProduct.scss';
import { useImageLoader } from '../../../hooks/useImageLoader';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { NavLink } from 'react-router-dom';
import { useBoundStore } from '../../../store/useBoundStore';
import { getImageLink } from '../../../utils/getImageLink';
import FavoriteProductControl from '../../FavoriteProductControl/FavoriteProductControl';
import CartItemControls from '../../CartItemControls/CartItemControls';
import Button from '../../Button/Button';
import { useFormik } from 'formik';
import { SAYS_SEPARATOR } from '../../../constants/product';
import getRandomPrice from '../../../utils/getRandomPrice';

type ModalContentProductProps = {
  product: ProductInterface;
};

export default function ModalContentProduct({
  product,
}: ModalContentProductProps) {
  const { id, price, tags } = product;
  const imageUrl = getImageLink({ id });
  const { loading, errorMessage } = useImageLoader({
    imageUrl: imageUrl,
  });
  const windowWidth = useWindowWidth();
  const imageSize = windowWidth > 420 ? 400 : windowWidth - 20;
  const clearModal = () => useBoundStore.setState({ modalContentData: null });
  const productInCart = useBoundStore((state) =>
    state.cartProducts.find((item) => item.id === id)
  );
  const productInFavorites = useBoundStore((state) =>
    state.favoriteProducts.find((item) => item.id === id)
  );
  const addProductToCart = useBoundStore((state) => state.addProductToCart);

  if (loading) {
    return (
      <div className="modal-content-product__loading-wrapper">
        <ReactLoading
          type="spin"
          width={imageSize}
          height={imageSize}
          color="#12c312"
        />
      </div>
    );
  }
  return (
    <div className="modal-content-product">
      <>
        {!!errorMessage ? (
          <span>{errorMessage}</span>
        ) : (
          <div className="modal-content-product__image-wrapper">
            <img
              src={imageUrl}
              alt=""
              className="modal-content-product__image"
            />
          </div>
        )}
        <div className="modal-content-product__info">
          <span className="modal-content-product__id">
            ID: "{id.slice(0, 16)}"
          </span>
          <span className="modal-content-product__price">
            {productInCart?.price || productInFavorites?.price || price}₽
          </span>
          {tags.length && (
            <div className="modal-content-product__tags">
              <span>Теги:</span>
              <ul className="modal-content-product__tag-list">
                {tags.map((tag) => {
                  return (
                    <li
                      className="modal-content-product__tag-element"
                      key={tag}
                    >
                      <NavLink onClick={clearModal} to={`/find?tags=${tag}`}>
                        {tag}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="modal-content-product__controls">
          <div className="modal-content-product__controls-block">
            <ChangeProductForm product={product} />
          </div>
          <div className="modal-content-product__controls-block">
            <FavoriteProductControl product={product} />
            {productInCart ? (
              <CartItemControls productId={product.id} />
            ) : (
              <Button onClick={() => addProductToCart(product)} theme="orange">
                В корзину
              </Button>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

function ChangeProductForm({ product }: { product: ProductInterface }) {
  const [realProductId, currentSays] = product.id.split(SAYS_SEPARATOR);
  const formik = useFormik<{ says: string }>({
    initialValues: {
      says: '',
    },
    onSubmit(values) {
      if (currentSays === values.says) return;
      const newProductId = values.says
        ? `${realProductId}${SAYS_SEPARATOR}${values.says}`
        : realProductId;
      useBoundStore.setState({
        modalContentData: {
          ...product,
          id: newProductId,
          price: getRandomPrice(),
        },
      });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="modal-content-product__form"
    >
      <label htmlFor="says">Добавить текст</label>
      <input
        className="modal-content-product__form-input"
        type="text"
        name="says"
        id="says"
        placeholder="Мимими"
        onChange={(event) => formik.setFieldValue('says', event.target.value)}
      />
      <Button type="submit">Применить</Button>
    </form>
  );
}
