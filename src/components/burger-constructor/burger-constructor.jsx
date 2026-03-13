import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorList } from 'src/components/burger-constructor/burger-constructor-list/burger-constructor-list.jsx';

import { clearConstructor, selectTotalPrice } from '@/services/burger-constructor.js';
import { createOrder, clearOrder, selectOrderLoading } from '@/services/order.js';
import { selectIsAuthenticated } from '@services/auth';

import Modal from '../modal/modal.jsx';
import { OrderDetails } from '../order-datails/order-datails.jsx';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { orderNumber } = useSelector((state) => state.order);
  const totalPrice = useSelector(selectTotalPrice);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isOrderLoading = useSelector(selectOrderLoading);

  const modalOpen = orderNumber !== null;
  const hasBun = bun !== null;

  const handleOpenModal = async () => {
    if (!hasBun) {
      return;
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
          disabled={!hasBun || isOrderLoading}
        >
          {isOrderLoading ? 'Оформление...' : 'Оформить заказ'}
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
