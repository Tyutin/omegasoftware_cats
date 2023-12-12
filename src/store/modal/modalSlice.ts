import { StateCreator } from 'zustand';
import { ModalState } from './types';
import 'zustand/middleware/immer'


export const createModalSlice: StateCreator<ModalState, [['zustand/immer', never]], [], ModalState> = (set) => ({
  modalContentData: null
})