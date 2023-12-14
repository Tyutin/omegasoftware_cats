import { ProductInterface } from '../../../types/product.interface';
import ReactLoading from 'react-loading';

import './ModalContentProduct.scss';
import { useImageLoader } from '../../../hooks/useImageLoader';

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
  return (
    <div className="modal-content-product">
      {!loading ? (
        <>
          {!!errorMessage ? (
            <span>{errorMessage}</span>
          ) : (
            <img
              src={`https://cataas.com/cat/${id}`}
              alt=""
              className="modal-content-product__image"
            />
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
          <ReactLoading type="spin" width={400} height={400} color="#12c312" />
        </div>
      )}
    </div>
  );
}
