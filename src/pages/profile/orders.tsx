import type { FC } from 'react';

import styles from './orders.module.css';

export const ProfileOrderPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1 className="text text_type_main-large">История заказов</h1>
        <p className="text text_type_main-default">
          Эта страница находится в разработке
        </p>
      </div>
    </div>
  );
};
