import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const Login = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const t = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (authFailed) {
      inputRef.current.focus();
    }
  }, [authFailed]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post('/api/v1/login', { username, password });
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          auth.logIn(token);
          navigate('/');
        } else {
          throw new Error('Ошибка авторизации');
        }
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();
          formik.errors.username = ' ';
          formik.errors.password = 'Неверные имя пользователя или пароль';
          setAuthFailed(true);
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder={t('username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed || formik.errors.username}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('password')}
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed || formik.errors.password}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        <Form.Control.Feedback type="invalid">{t('submissionFailed')}</Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        {t('loginHeader')}
      </Button>
    </Form>
  );
};

export default Login;
