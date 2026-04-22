import {
  Button,
  PasswordInput,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  resetPassword,
  clearError,
  canAccessResetPassword,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import styles from './reset-password.module.css';

type FormData = {
  password: string;
  token: string;
};

export const ResetPasswordPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    password: '',
    token: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  useEffect(() => {
    if (!canAccessResetPassword()) {
      navigate('/login');
    }
  }, [navigate]);

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

    const result = await dispatch(
      resetPassword({
        password: formData.password,
        token: formData.token,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      console.log('Пароль успешно сброшен:', result.payload);
      navigate('/login');
    } else {
      console.error('Ошибка сброса пароля:', result.payload);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="text text_type_main-medium pb-5">Восстановление пароля</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите новый пароль"
            icon="ShowIcon"
          />

          <Input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleChange}
            placeholder="Введите код из письма"
            errorText={error || undefined}
            error={!!error}
          />

          <Button type="primary" size="large" htmlType="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
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
