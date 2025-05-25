import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Landing from './pages/screen_landing.jsx';
//import Instalaciones from './pages/Instalaciones.jsx';
//import Reservas from './pages/Reservas.jsx';
//import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        {/*<Route path="/instalaciones" element={<Instalaciones />} /> */}
        {/*<Route path="/reservas" element={<Reservas />} /> */}
        {/*<Route path="/login" element={<Login />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
