import { Routes, Route, useLocation } from 'react-router-dom';

import { App } from '@components/app/app';
import { IngredientDetailView } from '@components/ingredient-details/ingredient-detail-view';
import { ProtectedRoute } from '@components/protected-route';
import { FeedPage } from '@pages/feed';
import { ForgotPasswordPage } from '@pages/forgot-password';
import { Home } from '@pages/home';
import { IngredientDetailsModule } from '@pages/ingredient-details';
import { LoginPage } from '@pages/login';
import { NotFoundPage } from '@pages/not-found';
import { ProfilePage, ProfileOrderPage } from '@pages/profile';
import { RegisterPage } from '@pages/register';
import { ResetPasswordPage } from '@pages/reset-password';

export const AppRoutes = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="orders" element={<ProfileOrderPage />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetailView />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnauth={true}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnauth={true}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnauth={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnauth={true}>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModule />} />
        </Routes>
      )}
    </>
  );
};
