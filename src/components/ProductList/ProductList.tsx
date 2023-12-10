import { Product } from '../../types/product.interface';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';

export default function ProductList(props: { products: Product[] }) {
  const { products } = props;
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
