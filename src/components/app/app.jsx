import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { checkAuth, selectIsAuthenticated, selectAuthLoading } from '@services/auth';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);

  // Проверяем авторизацию при монтировании App
  useEffect(() => {
    // Если есть токен в localStorage, но пользователь не авторизован в Redux,
    // проверяем валидность токена
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isAuthenticated && !isLoading) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  // Показываем загрузку во время проверки авторизации
  if (isLoading && !isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};
