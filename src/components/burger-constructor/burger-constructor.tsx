import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorList } from 'src/components/burger-constructor/burger-constructor-list/burger-constructor-list';

import { clearConstructor, selectTotalPrice } from '@/services/burger-constructor';
import { createOrder, clearOrder, selectOrderLoading } from '@/services/order';
import { selectIsAuthenticated } from '@services/auth';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import Modal from '../modal/modal';
import { OrderDetails } from '../order-datails/order-datails';

import type { FC } from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bun = useAppSelector((state) => state.burgerConstructor.bun);
  const ingredients = useAppSelector((state) => state.burgerConstructor.ingredients);
  const totalPrice = useAppSelector(selectTotalPrice);
  const orderLoading = useAppSelector(selectOrderLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const modalOpen = useAppSelector((state) => state.order.orderNumber) !== null;
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
          disabled={!hasBun || orderLoading}
        >
          {orderLoading ? 'Оформление...' : 'Оформить заказ'}
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
