// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  Routes, Route, useLocation, Navigate, HashRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import ErrorPage from './components/Error';
import MainPage from './components/Main';
import AuthProvider from './components/Auth';
import Navbar from './components/Navbar';
import Modal from './components/modals/Modal';
import Signup from './components/Signup';
import routes from './routes';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  return (
    userId ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TESTENV_TOKEN,
  environment: 'testenv',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <HashRouter>
          <div className="d-flex flex-column h-100">
            <Modal />
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <MainPage />
                  </PrivateRoute>
          )}
              />
              <Route path="*" element={<ErrorPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </div>
        </HashRouter>
      </AuthProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
