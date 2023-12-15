import { IoMdClose } from 'react-icons/io';

import './Modal.scss';
import { useBoundStore } from '../../store/useBoundStore';
import ModalContentProduct from './ModalContentCat/ModalContentProduct';

export default function Modal() {
  const modalContentData = useBoundStore((state) => state.modalContentData);
  if (!modalContentData) {
    return null;
  }
  const clearModal = () => useBoundStore.setState({ modalContentData: null });
  return (
    <div className="modal" onClick={clearModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-button" onClick={clearModal}>
          <IoMdClose className="modal__close-icon" />
        </button>
        <ModalContentProduct product={modalContentData} />
      </div>
    </div>
  );
}
