import type { FC } from 'react';

import styles from './modal.module.css';

type ModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return <div className={styles.modal_overlay} onClick={onClose}></div>;
};
