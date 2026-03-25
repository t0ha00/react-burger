import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { checkAuth, selectIsAuthenticated, selectAuthLoading } from '@services/auth';
import { fetchIngredients } from '@services/ingredients';

import type { AppDispatch, RootState } from '@services/store.ts';

import styles from './app.module.css';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );
  const isLoading = useSelector((state: RootState) => selectAuthLoading(state));

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
