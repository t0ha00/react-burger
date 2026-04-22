import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { FeedOrderDetails } from '@components/feed/feed-order-details/feed-order-details';
import Modal from '@components/modal/modal';
import { connectWebSocket, selectFeedLoading, selectOrderById } from '@services/feed';

import type { RootState, AppDispatch } from '@services/store';

export const FeedOrderDetailsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isLoading = useSelector(selectFeedLoading);
  const selectedOrder = useSelector((state: RootState) =>
    selectOrderById(state, id || '')
  );
  const background = location.state?.background;

  useEffect(() => {
    dispatch(connectWebSocket());
  }, [dispatch]);

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  if (isLoading) {
    return null;
  }

  if (!selectedOrder) {
    return null;
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
