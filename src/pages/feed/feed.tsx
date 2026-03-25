import type { FC } from 'react';

import styles from './feed.module.css';

export const FeedPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <p className="text text_type_main-medium">Эта страница находится в разработке</p>
    </div>
  );
};
