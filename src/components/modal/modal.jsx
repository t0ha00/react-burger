import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal({ header, close, children }) {
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
      <div className={styles.modal}>
        <div className="pl-10 pr-10 pt-10 pb-15">
          <div className={styles.modal_header}>
            <h3 className="text text_type_main-large">{header}</h3>
            <CloseIcon type="primary" onClick={close} />
          </div>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
