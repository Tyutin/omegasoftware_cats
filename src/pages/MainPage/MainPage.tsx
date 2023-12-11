import ProductList from '../../components/ProductList/ProductList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../components/Pagination/Pagination';
import { useProductStore } from '../../store/product/product';

import './MainPage.scss';

export default function MainPage() {
  const currentPageProducts = useProductStore(
    (state) => state.currentPageProducts
  );
  const error = useProductStore((state) => state.error);

  return (
    <div className="main-page">
      {error ? (
        <ErrorMessage
          error={error}
          alertText="Произошла ошибка загрузки данных"
        />
      ) : (
        <>
          <ProductList products={currentPageProducts} />
          <Pagination />
        </>
      )}
    </div>
  );
}
