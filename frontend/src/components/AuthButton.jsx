import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthContext } from './AuthProvider';
import { navigationRoutes } from '../routes';

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    auth.isAuthtoraized
      ? <Button onClick={auth.logOut}>{t('authButton.logOut')}</Button>
      : <Button as={Link} to={navigationRoutes.login()} state={{ from: location }}>{t('authButton.logIn')}</Button>
  );
};

export default AuthButton;
