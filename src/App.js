import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './pages/Login';
import { Browse } from './pages/Browse';
import { Details } from './pages/Details';
import { Cart } from './pages/Cart';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Layout />}>
      <Route exact path="/browse" element={<Browse />} />
      <Route exact path="/:id" element={<Details />} />
      <Route exact path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
