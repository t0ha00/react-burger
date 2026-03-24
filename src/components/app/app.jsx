import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { checkAuth, selectIsAuthenticated, selectAuthLoading } from '@services/auth';
import { fetchIngredients } from '@services/ingredients';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isAuthenticated && !isLoading) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  if (isLoading && !isAuthenticated) {
    return (
      <div className={styles.loading}>
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
