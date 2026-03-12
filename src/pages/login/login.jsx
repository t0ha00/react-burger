import {
  Button,
  PasswordInput,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  loginUser,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';

import styles from './login.module.css';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    );

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
            errorText={error}
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
