import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { checkAuth, selectIsAuthenticated, selectAuthLoading } from '@services/auth';

export const ProtectedRoute = ({ children, onlyUnauth = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);

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
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
