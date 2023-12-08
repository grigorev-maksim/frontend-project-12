import { useFormik } from 'formik';
import { Container, Row, Form } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from './AuthProvider';
import { apiRoutes, navigationRoutes } from '../routes';

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.userLength'))
        .max(20, t('validationErrors.userLength')),
      password: yup
        .string()
        .required(t('validationErrors.required'))
        .min(6, t('validationErrors.passwordLength')),
      passwordConfirmation: yup
        .string()
        .required(t('validationErrors.required'))
        .oneOf([yup.ref('password'), null], t('validationErrors.noMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const res = await axios.post(apiRoutes.signup(), { username, password });
        auth.logIn(res.data.token, username);
        navigate(navigationRoutes.chat());
      } catch (err) {
        if (err.response.status === 409) {
          formik.errors.username = t('validationErrors.alreadyExist');
        } else {
          formik.errors.username = t('error.network');
        }
      }
    },
  });

  return (
    <Container fluid>
      <Row className="justify-content-center align-content-center mt-5">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg"
                    className="rounded-circle"
                    alt="avatar"
                    width="200"
                    height="200"
                  />
                </div>

                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('signupForm.header')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      isInvalid={formik.touched.username
                        && formik.errors.username}
                      id="username"
                      name="username"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label htmlFor="username">{t('signupForm.labels.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      isInvalid={formik.touched.password
                        && formik.errors.password}
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label htmlFor="password">{t('signupForm.labels.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      isInvalid={formik.touched.passwordConfirmation
                        && formik.errors.passwordConfirmation}
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.passwordConfirmation}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label htmlFor="passwordConfirmation">{t('signupForm.labels.passwordConfirmation')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.passwordConfirmation}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('signupForm.button')}</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default SignupPage;
