import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal({ close, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={close} />
      <div className={styles.modal}>{children}</div>
    </>,
    modalRoot
  );
}

export default Modal;
