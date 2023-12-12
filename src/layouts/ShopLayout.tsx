import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

import './ShopLayout.scss';
import Modal from '../components/Modal/Modal';

export default function ShopLayout() {
  return (
    <div className="shop-layout">
      <Header />
      <main className="shop-layout__content">
        <Outlet />
      </main>
      <Modal />
    </div>
  );
}
