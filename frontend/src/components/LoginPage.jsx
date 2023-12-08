import { Form, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { apiRoutes, navigationRoutes } from '../routes';

const Login = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(t('validationErrors.required')),
      password: yup.string().required(t('validationErrors.required')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const res = await axios.post(apiRoutes.login(), { username, password });
        auth.logIn(res.data.token, username);
        if (location) {
          navigate(location.state.from.pathname);
        } else {
          navigate(navigationRoutes.chat());
        }
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status !== 'ok') {
          inputRef.current.select();
          formik.errors.username = ' ';
          formik.errors.password = t('validationErrors.submissionFailed');
        }
      }
    },
  });

  return (
    <Container fluid>
      <Row className="justify-content-center align-content-center mt-5 h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAde8nF_hZqhtU7tsq9wkXBB-Nno9e0TC22N8yHzDOUg6Ll2MEuZJpmX9KrM7JCaR-pt0&usqp=CAU"
                    className="rounded-circle"
                    alt="avatar"
                    width="200"
                    height="200"
                  />
                </div>
                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('loginForm.header')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      isInvalid={formik.touched.username && formik.errors.username}
                      id="username"
                      name="username"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('loginForm.labels.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      isInvalid={formik.touched.password && formik.errors.password}
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Label htmlFor="password">{t('loginForm.labels.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginForm.header')}</button>
                </Form>
              </div>

            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('footer.question')}</span>
                {' '}
                <Link to={navigationRoutes.signup()}>{t('footer.link')}</Link>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
