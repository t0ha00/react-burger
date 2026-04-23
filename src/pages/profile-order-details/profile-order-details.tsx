import { useEffect, type FC } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { FeedOrderDetails } from '@components/feed/feed-order-details/feed-order-details';
import Modal from '@components/modal/modal';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  connectUserWebSocket,
  closeUserWebSocket,
  selectProfileLoading,
  selectProfileOrderById,
} from '@services/profile-feed';

export const ProfileOrderDetails: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isLoading = useAppSelector(selectProfileLoading);
  const selectedOrder = useAppSelector((state) =>
    selectProfileOrderById(state, id || '')
  );
  const background = location.state?.background;

  useEffect(() => {
    dispatch(connectUserWebSocket());
    return (): void => {
      dispatch(closeUserWebSocket());
    };
  }, [dispatch]);

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <p className="text text_type_main-large">Загрузка заказа...</p>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <p className="text text_type_main-large">Заказ не найден</p>
      </div>
    );
  }

  if (background) {
    return (
      <Modal header={`#${selectedOrder.number}`} close={handleCloseModal}>
        <FeedOrderDetails order={selectedOrder} />
      </Modal>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <FeedOrderDetails order={selectedOrder} />
    </div>
  );
};
