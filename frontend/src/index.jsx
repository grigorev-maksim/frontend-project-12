import React from 'react';
import ReactDOM from 'react-dom/client';
import Component from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('container');

const root = ReactDOM.createRoot(container);
root.render(<Component />);
