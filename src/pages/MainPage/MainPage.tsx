import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import {
  ProductInterface,
  ProductResponseInterface,
} from '../../types/product.interface';
import getRandomPrice from '../../utils/getRandomPrice';
import axios, { AxiosError } from 'axios';
import { catRequestLimit } from '../../constants';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Pagination from '../../components/Pagination/Pagination';

import './MainPage.scss';

export default function MainPage(props: { totalCatCount: number }) {
  const { totalCatCount } = props;
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [error, setError] = useState<AxiosError>();

  const paginationCount = Math.ceil(totalCatCount / catRequestLimit);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProductResponseInterface[]>(
          `https://cataas.com/api/cats?limit=${catRequestLimit}&skip=${
            (currentPage - 1) * catRequestLimit
          }`
        );
        setProducts(
          response.data.map((el) => {
            return {
              id: el._id,
              tags: el.tags,
              price: getRandomPrice(),
            };
          })
        );
      } catch (error) {
        setError(error as AxiosError);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      {error ? (
        <ErrorMessage
          error={error}
          alertText="Произошла ошибка загрузки данных"
        />
      ) : (
        <div className="main-page">
          <ProductList products={products} />
          {paginationCount > 1 && (
            <div className="main-page__pagination">
              <Pagination
                paginationCount={paginationCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
