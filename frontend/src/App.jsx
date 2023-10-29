import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Error from './Components/Error';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
)

export default App;