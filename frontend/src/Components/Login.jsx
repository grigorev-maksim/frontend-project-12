import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const Login = () => (
  <div>
    <h1>Sign In</h1>
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={ (values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="login" placeholder="Login" />
          {errors.login && touched.login ? (
            <div>{errors.login}</div>
          ) : null}
          <Field name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
