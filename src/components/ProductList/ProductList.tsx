import useWindowWidth from '../../hooks/useWindowWidth';
import { ProductInterface } from '../../types/product.interface';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';

type ProductListProps = {
  products: ProductInterface[];
};

export default function ProductList({ products }: ProductListProps) {
  const windowWidth = useWindowWidth();
  const productImageSize =
    windowWidth > 460 ? 200 : (windowWidth - 30) / 2 - 20;
  return (
    <ul className="product-list">
      {products.map((product) => {
        return (
          <li className="product-list__element" key={product.id}>
            <ProductCard product={product} imageSize={productImageSize} />
          </li>
        );
      })}
    </ul>
  );
}
