import ReactDOM from 'react-dom/client';
import App from './App';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
};

app();
