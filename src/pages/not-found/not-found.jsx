import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text text_type_digits-large">404</h1>
        <p className="text text_type_main-large">Страница не найдена</p>
        <Link to="/" className={styles.link}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
