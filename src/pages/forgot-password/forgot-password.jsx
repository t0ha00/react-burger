import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  forgotPassword,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';

import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(result)) {
      console.log('Email для восстановления отправлен:', result.payload);
      navigate('/reset-password');
    } else {
      console.error('Ошибка отправки email:', result.payload);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="text text_type_main-medium pb-5">Восстановление пароля</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <EmailInput
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Укажите e-mail"
            errorText={error}
          />

          <Button type="primary" size="large" htmlType="submit" disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Восстановить'}
          </Button>
        </form>

        <div className={styles.linkContainer}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
