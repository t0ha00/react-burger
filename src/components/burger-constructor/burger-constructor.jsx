import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerConstructorList } from 'src/components/burger-constructor/burger-constructor-list/burger-constructor-list.jsx';

import { clearConstructor, selectTotalPrice } from '@/services/burger-constructor.js';
import { createOrder, clearOrder } from '@/services/order.js';

import Modal from '../modal/modal.jsx';
import { OrderDetails } from '../order-datails/order-datails.jsx';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { orderNumber } = useSelector((state) => state.order);
  const totalPrice = useSelector(selectTotalPrice);

  const modalOpen = orderNumber !== null;

  const handleOpenModal = async () => {
    try {
      await dispatch(createOrder()).unwrap();
    } catch (error) {
      alert(`Ошибка оформления заказа: ${error}`);
    }
  };

  const handleCloseModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  return (
    <div>
      <BurgerConstructorList bun={bun} ingredients={ingredients} />
      <div className={`${styles.total_summary}`}>
        <div className="pr-10">
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
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
