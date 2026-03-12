import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@components/app/app';
import { ProtectedRoute } from '@components/protected-route';
import { FeedPage } from '@pages/feed';
import { ForgotPasswordPage } from '@pages/forgot-password';
import { Home } from '@pages/home';
import { IngredientDetailsPage } from '@pages/ingredient-details';
import { LoginPage } from '@pages/login';
import { NotFoundPage } from '@pages/not-found';
import { ProfilePage, ProfileOrderPage } from '@pages/profile';
import { RegisterPage } from '@pages/register';
import { ResetPasswordPage } from '@pages/reset-password';
import { store } from '@services/store';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'ingredients/:id',
        element: <Home />,
        children: [
          {
            index: true,
            element: <IngredientDetailsPage />,
          },
        ],
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: 'orders',
            element: <ProfileOrderPage />,
          },
        ],
      },
      {
        path: '/feed',
        element: <FeedPage />,
      },
      {
        path: '/register',
        element: (
          <ProtectedRoute onlyUnauth={true}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute onlyUnauth={true}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <ProtectedRoute onlyUnauth={true}>
            <ForgotPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <ProtectedRoute onlyUnauth={true}>
            <ResetPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
