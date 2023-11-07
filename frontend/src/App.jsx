import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Error from './Components/Error';
import Login from './Components/Login';
import MainPage from './Components/MainPage';
import AuthProvider from './Components/AuthProvider';

// eslint-disable-next-line arrow-body-style, padded-blocks
const App = () => {
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
          </nav>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};
export default App;
