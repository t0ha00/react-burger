import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FeedOrderCard } from '@components/feed/feed-order-card/feed-order-card';
import {
  connectWebSocket,
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedLoading,
} from '@services/feed';

import type { Order } from '@/types';
import type { AppDispatch } from '@services/store';

import styles from './feed.module.css';

export const FeedPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(connectWebSocket());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-large">Загрузка ленты заказов...</p>
      </div>
    );
  }

  const doneOrders = orders.filter((order) => order.status === 'done').slice(0, 20);
  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .slice(0, 20);

  const splitOrders = (ordersList: Order[], maxPerColumn = 10): Order[][] => {
    const result: Order[][] = [];
    for (let i = 0; i < ordersList.length; i += maxPerColumn) {
      result.push(ordersList.slice(i, i + maxPerColumn));
    }
    return result.slice(0, 2); // Максимум 2 колонки
  };

  const doneColumns = splitOrders(doneOrders);
  const pendingColumns = splitOrders(pendingOrders);

  return (
    <div className={styles.container}>
      <div className={styles.feed_list}>
        <div className={styles.feed_header}>
          <h1 className="text text_type_main-large">Лента заказов</h1>
        </div>
        <div className={`${styles.orders_list} custom-scroll`}>
          {orders.map((order) => (
            <FeedOrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
      <div className={styles.orders_status}>
        <div className={styles.status_list}>
          <div className={styles.status_column}>
            <h2 className="text text_type_main-medium">Готовы:</h2>
            {doneColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={styles.status_items}>
                {column.map((order) => (
                  <div
                    key={order._id}
                    className={`${styles.status_number} text text_type_digits-default text_color_success`}
                  >
                    #{order.number}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.status_column}>
            <h2 className="text text_type_main-medium">В работе:</h2>
            {pendingColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={styles.status_items}>
                {column.map((order) => (
                  <div
                    key={order._id}
                    className={`${styles.status_number} text text_type_digits-default text_color_inactive`}
                  >
                    #{order.number}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text text_type_main-medium">Готово за все время:</h2>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className="mt-10">
          <h2 className="text text_type_main-medium">Готово за сегодня:</h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </div>
  );
};
