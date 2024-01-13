/* eslint-disable consistent-return */
import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import {
  Form, Button, Container, Card, Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../routes';
import { useAuth } from '../hooks';

const Signup = () => {
  const [disabled, setDisable] = useState(false);
  const inputRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const minPasswordLength = 6;
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(20)
      .required(),
    password: Yup.string()
      .required()
      .min(minPasswordLength, 'errors.fieldTooShort.symbol'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')])
      .required(),
  });

  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="mb-4">{t('buttons.signUp')}</h1>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={signUpSchema}
                onSubmit={async (values, actions) => {
                  setDisable(true);
                  try {
                    const response = await axios.post(
                      routes.signupPath(),
                      { username: values.username, password: values.password },
                    );
                    auth.setUsername(response.data.username);
                    auth.logIn(response.data);
                    navigate(routes.mainPagePath());
                  } catch (e) {
                    setDisable(false);
                    if (e.response.status === 409) {
                      return actions.setErrors({
                        username: t('errors.notUniqueUser'),
                      });
                    }
                    actions.setErrors({
                      username: t('errors.defaultSignUp'),
                    });
                    inputRef.current.focus();
                    inputRef.current.select();
                    throw e;
                  }
                }}
              >
                {({
                  handleSubmit, handleChange, handleBlur, values, errors, touched,
                }) => (
                  <Form
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>{t('auth.username')}</Form.Label>
                      <Form.Control
                        ref={inputRef}
                        name="username"
                        type="text"
                        placeholder={t('auth.username')}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.username && !!errors.username}
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.username)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>{t('auth.password')}</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder={t('auth.password')}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.password, { count: minPasswordLength })}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>{t('auth.confirmPassword')}</Form.Label>
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder={t('auth.confirmPassword')}
                        value={values.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={disabled}>
                      {t('buttons.signUp')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('auth.signInMessage')}
                <span>
                  {' '}
                  <Card.Link>
                    <Link to={routes.loginPagePath()}>{t('buttons.signIn')}</Link>
                  </Card.Link>
                </span>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Signup;
