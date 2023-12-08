import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider.jsx';
import AuthButton from './AuthButton.jsx';
import { navigationRoutes } from '../routes';

const Header = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to={navigationRoutes.chat()}>{t('header')}</Navbar.Brand>
        {auth.isAuthtoraized && <AuthButton />}
      </div>
    </Navbar>
  );
};

export default Header;
