import { useEffect, type FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { checkAuth, selectIsAuthenticated, selectAuthLoading } from '@services/auth';
import { useAppDispatch, useAppSelector } from '@services/hooks';

type ProtectedRouteProps = {
  children: React.ReactNode;
  onlyUnauth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnauth = false,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isAuthenticated && !isLoading) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  if (onlyUnauth) {
    if (isAuthenticated) {
      const { from } = location.state || { from: { pathname: '/' } };
      return <Navigate to={from} replace />;
    }
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
