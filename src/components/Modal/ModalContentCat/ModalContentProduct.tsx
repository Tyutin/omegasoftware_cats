import { ProductInterface } from '../../../types/product.interface';
import ReactLoading from 'react-loading';

import './ModalContentProduct.scss';
import { useImageLoader } from '../../../hooks/useImageLoader';
import useWindowWidth from '../../../hooks/useWindowWidth';

type ModalContentProductProps = {
  product: ProductInterface;
};

export default function ModalContentProduct({
  product,
}: ModalContentProductProps) {
  const { id, price, tags } = product;
  const { loading, errorMessage } = useImageLoader({
    imageUrl: `https://cataas.com/cat/${id}`,
  });
  const windowWidth = useWindowWidth();
  const imageSize = windowWidth > 420 ? 400 : windowWidth - 20;
  return (
    <div className="modal-content-product">
      {!loading ? (
        <>
          {!!errorMessage ? (
            <span>{errorMessage}</span>
          ) : (
            <div className="modal-content-product__image-wrapper">
              <img
                src={`https://cataas.com/cat/${id}`}
                alt=""
                className="modal-content-product__image"
              />
            </div>
          )}
          <div className="modal-content-product__info">
            <span className="modal-content-product__id">ID: "{id}"</span>
            <span className="modal-content-product__price">{price}₽</span>
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
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="modal-content-product__loading-wrapper">
          <ReactLoading
            type="spin"
            width={imageSize}
            height={imageSize}
            color="#12c312"
          />
        </div>
      )}
    </div>
  );
}
