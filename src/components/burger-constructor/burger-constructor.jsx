import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { BurgerConstructorList } from 'src/components/burger-constructor/burger-constructor-list/burger-constructor-list.jsx';

import Modal from '../modal/modal.jsx';
import { OrderDetails } from '../order-datails/order-datails.jsx';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }
  return (
    <div>
      <BurgerConstructorList ingredients={ingredients} />
      <div className={`${styles.total_summary}`}>
        <div className="pr-10">
          <span className="text text_type_digits-medium">123</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => handleOpenModal()}
        >
          Оформить заказ
        </Button>
      </div>

      {modalOpen && (
        <Modal close={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
