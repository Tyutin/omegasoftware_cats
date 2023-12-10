import ProductList from '../../components/ProductList/ProductList';
import { Product } from '../../types/product.interface';
import getRandomPrice from '../../utils/getRandomPrice';

const products: Product[] = [
  {
    id: 'swEQG2TUk9tEjLLH',
    price: getRandomPrice(),
    tags: [],
  },
  {
    id: 'bKN0iaq9nZ3Je2HU',
    price: getRandomPrice(),
    tags: [],
  },
  {
    id: 'rrsvsbRgL7zaJuR3',
    price: getRandomPrice(),
    tags: [],
  },
  {
    id: 'BgStpOSAyjeFKwRG',
    price: getRandomPrice(),
    tags: [],
  },
  {
    id: 'PqT4PW0DYVekdpUr',
    price: getRandomPrice(),
    tags: [],
  },
];

export default function MainPage() {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
