import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './pages/Login';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
}

export default App;
