import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { navigationRoutes } from '../routes';

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    auth.isAuthtoraized
      ? children
      : <Navigate to={navigationRoutes.login()} state={{ from: location }} />
  );
};

export default PrivateRoute;
