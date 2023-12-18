import { Route, Routes } from 'react-router-dom';
import ShopLayout from './layouts/ShopLayout';
import MainPage from './pages/MainPage/MainPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import FindPage from './pages/FindPage/FindPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/find" element={<FindPage />} />
        </Route>
      </Routes>
    </>
  );
}
