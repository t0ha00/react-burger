import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import {
  logoutUser,
  clearError,
  updateUser,
  selectUser,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';

import styles from './profile.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    name: '',
    login: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({
    name: '',
    login: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      const data = {
        name: user.name || '',
        login: user.email || '',
        password: '',
      };
      setFormData(data);
      setOriginalData(data);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearError());
    }

    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateUser({
        name: formData.name,
        email: formData.login,
        password: formData.password,
      })
    );

    if (updateUser.fulfilled.match(result)) {
      console.log('Данные пользователя обновлены:', result.payload);
      setIsEditing(false);
      setOriginalData({
        ...formData,
        password: '',
      });
      setFormData((prev) => ({
        ...prev,
        password: '',
      }));
    } else {
      console.error('Ошибка обновления данных:', result.payload);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    if (error) {
      dispatch(clearError());
    }
  };

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      console.log('Выход выполнен успешно');
    } else {
      console.error('Ошибка выхода:', result.payload);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <NavLink
          to="/profile"
          className={`text text_type_main-large mb-10 ${styles.menuItem} ${!isProfilePage ? 'text_color_inactive' : styles.active}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-large mb-10 ${styles.menuItem} ${isProfilePage ? 'text_color_inactive' : styles.active}`}
        >
          История заказов
        </NavLink>
        <NavLink
          onClick={handleLogout}
          className={`text text_type_main-large text_color_inactive ${styles.menuItem}`}
        >
          Выход
        </NavLink>
        <div
          className={`text text_type_main-default text_color_inactive mt-15 ${styles.menuItem}`}
        >
          В этом разделе вы можете<br></br>изменить свои персональные данные
        </div>
      </div>

      <div>
        {isProfilePage ? (
          <>
            <form className={styles.form}>
              <Input
                name="name"
                type="text"
                placeholder="Имя"
                value={formData.name}
                icon="EditIcon"
                onChange={handleChange}
              />

              <Input
                name="login"
                type="text"
                placeholder="Логин"
                value={formData.login}
                icon="EditIcon"
                onChange={handleChange}
              />

              <PasswordInput
                name="password"
                placeholder="Пароль"
                value={formData.password}
                icon="EditIcon"
                onChange={handleChange}
              />

              {isEditing && (
                <div className={styles.buttons}>
                  <Button
                    type="secondary"
                    size="large"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Сохранение...' : 'Сохранить'}
                  </Button>
                </div>
              )}
            </form>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
