import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FeedOrderCard } from '@components/feed/feed-order-card/feed-order-card';
import {
  connectUserWebSocket,
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError,
} from '@services/feed';

import type { AppDispatch } from '@services/store';

import styles from './profile-orders.module.css';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(connectUserWebSocket());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-large">Загрузка заказов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-large text_color_error">{error}</p>
      </div>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.container}>
      <div className={styles.orders_list}>
        {sortedOrders.map((order) => (
          <FeedOrderCard key={order._id} order={order} basePath="/profile/orders" />
        ))}
      </div>
    </div>
  );
};
