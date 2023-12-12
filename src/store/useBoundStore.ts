import { create } from 'zustand';
import { ProductStore } from './product/types';
import { CartStore } from './cart/types';
import { createProductSlice } from './product/productSlice';
import { createCartSlice } from './cart/cartSlice';
import { createFavoriteSlice } from './favorite/favoriteSlice';
import { FavoriteStore } from './favorite/types';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createModalSlice } from './modal/modalSlice';
import { ModalState } from './modal/types';

export const useBoundStore = create<ProductStore & CartStore & FavoriteStore & ModalState>()(
  immer(
    persist((...a) => ({
      ...createProductSlice(...a),
      ...createCartSlice(...a),
      ...createFavoriteSlice(...a),
      ...createModalSlice(...a)
    }), {
      name: 'kikiCustomerStore',
      partialize: (state) => ({cartProducts: state.cartProducts, favoriteProducts: state.favoriteProducts}),
    })
  )
)