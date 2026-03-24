import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  registerUser,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from '@services/auth';

import styles from './register.module.css';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

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
      registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
    );

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
            errorText={error}
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
