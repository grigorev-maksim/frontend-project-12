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

const Login = () => {
  const [disabled, setDisable] = useState(false);
  const inputRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(20)
      .required(),
    password: Yup.string().required(),
  });

  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="mb-4">{t('buttons.signIn')}</h1>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={signInSchema}
                onSubmit={async (values, actions) => {
                  setDisable(true);
                  try {
                    const response = await axios.post(routes.loginPath(), values);
                    auth.logIn(response.data);
                    navigate(routes.mainPagePath());
                  } catch (e) {
                    setDisable(false);
                    actions.setErrors({
                      username: ' ',
                      password: t('errors.wrongCredentials'),
                    });
                    inputRef.current.focus();
                    inputRef.current.select();
                    throw e;
                  }
                }}
              >
                {({
                  handleSubmit, handleChange, values, errors, touched,
                }) => (

                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>{t('auth.nickname')}</Form.Label>
                      <Form.Control
                        ref={inputRef}
                        name="username"
                        type="text"
                        placeholder={t('auth.nickname')}
                        value={values.username}
                        onChange={handleChange}
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
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.password)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={disabled}>
                      {t('buttons.signIn')}
                    </Button>
                  </Form>

                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('auth.signUpMessage')}
                <span>
                  {' '}
                  <Card.Link>
                    <Link to={routes.signupPagePath()}>{t('auth.registration')}</Link>
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

export default Login;
