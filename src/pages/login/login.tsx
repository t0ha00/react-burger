import {
  Button,
  PasswordInput,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type FC, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  loginUser,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import type { LoginData } from '@/types';

import styles from './login.module.css';

type FormData = {
  email: string;
  password: string;
};

export const LoginPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const loginData: LoginData = {
      email: formData.email,
      password: formData.password,
    };

    const result = await dispatch(loginUser(loginData));

    if (loginUser.fulfilled.match(result)) {
      console.log('Вход успешный:', result.payload);
      navigate(from, { replace: true });
    } else {
      console.error('Ошибка входа:', result.payload);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="text text_type_main-medium pb-5">Вход</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <EmailInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            errorText={error || undefined}
          />

          <PasswordInput
            icon="ShowIcon"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="primary" size="large" htmlType="submit" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className={styles.linkContainer}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
            <Link to="/register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
