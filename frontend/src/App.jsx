import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NotFound from './components/NotFound';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import rollbarConfig from './utilits/rollbarConfig.js';
import { navigationRoutes } from './routes.js';

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <ToastContainer />
            <Routes>
              <Route
                path={navigationRoutes.chat()}
                element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                )}
              />
              <Route path={navigationRoutes.login()} element={<LoginPage />} />
              <Route path={navigationRoutes.signup()} element={<SignupPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
