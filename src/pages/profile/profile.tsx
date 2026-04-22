import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import {
  logoutUser,
  clearError,
  updateUser,
  selectUser,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import type { UpdateUserData } from '@/types';

import styles from './profile.module.css';

type FormData = {
  name: string;
  login: string;
  password: string;
};

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    login: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState<FormData>({
    name: '',
    login: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      const data: FormData = {
        name: user.name || '',
        login: user.email || '',
        password: '',
      };
      setFormData(data);
      setOriginalData(data);
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const updateData: UpdateUserData = {
      name: formData.name,
      email: formData.login,
      password: formData.password,
    };

    const result = await dispatch(updateUser(updateData));

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

  const handleCancel = (): void => {
    setFormData(originalData);
    setIsEditing(false);
    if (error) {
      dispatch(clearError());
    }
  };

  const handleLogout = async (): Promise<void> => {
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
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : 'text_color_inactive'}`
          }
          end
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : 'text_color_inactive'}`
          }
          end
        >
          История заказов
        </NavLink>
        <NavLink
          onClick={handleLogout}
          className={`text_color_inactive ${styles.menuItem}`}
        >
          Выход
        </NavLink>
        <div className={`text text_type_main-default text_color_inactive mt-15`}>
          В этом разделе вы можете<br></br>изменить свои персональные данные
        </div>
      </div>

      {isProfilePage ? (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
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
                  htmlType="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Отмена
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
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
  );
};
