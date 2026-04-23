import { useEffect, type FC } from 'react';

import { FeedOrderCard } from '@components/feed/feed-order-card/feed-order-card';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  connectUserWebSocket,
  closeUserWebSocket,
  selectProfileOrders,
  selectProfileLoading,
  selectProfileError,
} from '@services/profile-feed';

import type { Order } from '@/types';

import styles from './profile-orders.module.css';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectProfileOrders);
  const isLoading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectProfileError);

  useEffect(() => {
    dispatch(connectUserWebSocket());
    return (): void => {
      dispatch(closeUserWebSocket());
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.orders_list}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="mb-6"
              style={{ height: '144px', background: '#f3f3f3', borderRadius: '16px' }}
            />
          ))}
        </div>
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
  ) as Order[];

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
