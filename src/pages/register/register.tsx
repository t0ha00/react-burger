import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type FC, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  registerUser,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import type { RegisterData } from '@/types';

import styles from './register.module.css';

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

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

    const registerData: RegisterData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const result = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(result)) {
      console.log('Регистрация успешна:', result.payload);
      navigate('/login');
    } else {
      console.error('Ошибка регистрации:', result.payload);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="text text_type_main-medium pb-5">Регистрация</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>

        <div className={styles.linkContainer}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
