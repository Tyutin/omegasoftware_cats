import ProductList from '../../components/ProductList/ProductList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../components/Pagination/Pagination';
import { useBoundStore } from '../../store/useBoundStore';

export default function MainPage() {
  const currentPageProducts = useBoundStore(
    (state) => state.currentPageProducts
  );
  const error = useBoundStore((state) => state.productDataError);

  return (
    <div className="page">
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
