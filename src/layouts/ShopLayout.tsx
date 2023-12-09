import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

import './ShopLayout.scss';

export default function ShopLayout() {
  return (
    <div className="shop-layout">
      <Header />
      <div className="shop-layout__content">
        <Outlet />
      </div>
    </div>
  );
}
