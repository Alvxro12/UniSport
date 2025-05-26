import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from './components/navbar.jsx';
import Landing from './pages/screen_landing.jsx';
import Login from './pages/screen_login.jsx';
import Register from './pages/register.jsx';
import Instalaciones from './pages/Instalaciones.jsx';
import AdminInstalaciones from './pages/AdminInstalaciones.jsx';
import InstalacionDetalle from './pages/InstalacionDetalle.jsx';
import Reservas from './pages/Reservas.jsx';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./services/firebase";
import { getCurrentUser, logoutUser } from "./services/Authservice.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbarRoutes = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = getCurrentUser(async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userRef = doc(db, "usuarios", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        setUser({
          ...firebaseUser,
          rol: userData.rol || "usuario",
        });
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        setUser(firebaseUser); // fallback sin rol
      }
    } else {
      setUser(null);
      if (!["/login", "/register"].includes(location.pathname)) {
        navigate("/");
      }
    }
  });

  return () => unsubscribe();
}, [location.pathname, navigate]);

  return (
    <>
      {shouldShowNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/instalaciones" element={<Instalaciones user={user} />} />
        <Route path="/admin/instalaciones"element={<AdminInstalaciones user={user} />}/>
        <Route path="/instalacion/:id" element={<InstalacionDetalle />} />
        <Route path="/reservas" element={<Reservas user={user} />} />
      </Routes>
    </>
  );
}

export default App;
