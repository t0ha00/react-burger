import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorList } from 'src/components/burger-constructor/burger-constructor-list/burger-constructor-list';

import { clearConstructor, selectTotalPrice } from '@/services/burger-constructor';
import { createOrder, clearOrder, selectOrderLoading } from '@/services/order';
import { selectIsAuthenticated } from '@services/auth';

import Modal from '../modal/modal';
import { OrderDetails } from '../order-datails/order-datails';

import type { FC } from 'react';

import type { AppDispatch, RootState } from '@services/store';

import styles from './burger-constructor.module.css';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const { orderNumber } = useSelector((state: RootState) => state.order);
  const totalPrice = useSelector(selectTotalPrice);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isOrderLoading = useSelector(selectOrderLoading);

  const modalOpen = orderNumber !== null;
  const hasBun = bun !== null;

  const handleOpenModal = async (): Promise<void> => {
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

  const handleCloseModal = (): void => {
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
        <Modal header="" close={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
