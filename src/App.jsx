import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Landing from './pages/screen_landing.jsx';
import Login from './pages/screen_login.jsx';
import Register from './pages/register.jsx';
// import Instalaciones from './pages/Instalaciones.jsx';
// import Reservas from './pages/Reservas.jsx';
import { db } from './services/firebase.js';


function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/Register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*<Route path="/instalaciones" element={<Instalaciones />} />*/}
        {/*<Route path="/reservas" element={<Reservas />} />*/}
      </Routes>
    </>
  );
}

export default App;
