import { Route, Routes } from 'react-router-dom';
import ShopLayout from './layouts/ShopLayout';
import MainPage from './pages/MainPage/MainPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

export default function App() {
  const [catCount, setCatCount] = useState(0);
  const [error, setError] = useState<AxiosError>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ count: number }>(
          'https://cataas.com/api/count'
        );
        setCatCount(response.data.count);
      } catch (error) {
        setError(error as AxiosError);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route
            path="/"
            element={
              error ? (
                <ErrorMessage
                  error={error}
                  alertText="Произошла ошибка загрузки данных"
                />
              ) : (
                <MainPage totalCatCount={catCount} />
              )
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
}
