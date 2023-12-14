import { ProductInterface } from '../../types/product.interface';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';

type ProductListProps = {
  products: ProductInterface[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <ul className="product-list">
      {products.map((product) => {
        return (
          <li className="product-list__element" key={product.id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
}
