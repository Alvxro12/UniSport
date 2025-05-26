import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './boton_mobile';
import Footer from './footer';
import Imagen from './imagenes';
import Logo_unisport from '../assets/images/logo_unisport_white.png';
import { logoutUser } from "../services/Authservice";

function Navbar({ user }) {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const toggleOpen = () => setIsOpen(!isOpen);

const handleProtectedNavigation = (ruta) => {
if (user) {
    navigate(ruta);
} else {
    navigate("/login", { state: { from: ruta } });
}
};

const handleLogout = async () => {
await logoutUser();
navigate("/login");
};

return (
<header className="text-white px-4 relative z-50">
    <nav className="flex items-center justify-between">
    <Link to="/">
        <Imagen src={Logo_unisport} alt="UniSport" className="h-30 sm:h-40" />
    </Link>

    {/* Menú desktop */}
    <div className="hidden sm:flex gap-6 text-md mt-4 sm:mt-0">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <button onClick={() => handleProtectedNavigation("/instalaciones")} className="hover:text-primary cursor-pointer">Instalaciones</button>
        <button onClick={() => handleProtectedNavigation("/reservas")} className="hover:text-primary cursor-pointer">Reservas</button>
        {user?.rol === "admin" && (
        <button onClick={() => navigate("/admin/instalaciones")}className="hover:text-primary cursor-pointer">Admin Instalaciones</button>
)}

    </div>
    

    {/* Botón sesión */}
    {user ? (
        <button
        onClick={handleLogout}
        className="bg-[#AE0F28] px-5 py-2 cursor-pointer rounded-lg text-white text-md font-medium shadow-md hover:brightness-110 hover:scale-105 transition duration-300 ease-in-out hidden sm:flex"
        >
        Cerrar sesión
        </button>
    ) : (
        <Link to="/login">
        <button className="bg-[#AE0F28] cursor-pointer px-5 py-2 rounded-lg text-white text-md font-medium shadow-md hover:brightness-110 hover:scale-105 transition duration-300 ease-in-out hidden sm:flex">
            Iniciar sesión
        </button>
        </Link>
    )}

    <HamburgerMenu isOpen={isOpen} toggleOpen={toggleOpen} />
    </nav>

    {isOpen && (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden" onClick={toggleOpen}></div>
    )}

    <aside
    className={`fixed top-0 left-0 h-screen w-64 bg-[#181818] text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-700 ease-in-out sm:hidden z-40`}
    >
    <div className="flex flex-col gap-6 p-6 mt-16 text-left">
        <Link to="/" onClick={toggleOpen}>Inicio</Link>
        <button onClick={() => { handleProtectedNavigation("/instalaciones"); toggleOpen(); }} className='text-left cursor-pointer'>Instalaciones</button>
        <button onClick={() => { handleProtectedNavigation("/reservas"); toggleOpen(); }} className='text-left cursor-pointer'>Reservas</button>

        {user ? (
        <button
            onClick={() => {
            handleLogout();
            toggleOpen();
            }}
            className="bg-red-600 px-5 py-2 cursor-pointer rounded-lg text-white text-sm font-medium shadow-md hover:brightness-110 hover:scale-105 transition"
        >
            Cerrar sesión
        </button>
        ) : (
        <Link to="/login" onClick={toggleOpen}>
            <button className="bg-[#AE0F28] px-5 py-2 cursor-pointer rounded-lg text-white text-sm font-medium shadow-md hover:brightness-110 hover:scale-105 transition">
            Iniciar sesión
            </button>
        </Link>
        )}

        <Footer />
    </div>
    </aside>
</header>
);
}

export default Navbar;
