import { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './boton_mobile';
import Footer from './footer';

function Navbar() {
const [isOpen, setIsOpen] = useState(false);
const toggleOpen = () => setIsOpen(!isOpen);

return (
<header className=" text-white px-4 relative z-50">
    <nav className="flex items-center justify-between">

    <Link to="/">
        <img src="/src/assets/images/logo_unisport_white.png" alt="UniSport" className="h-30 sm:h-40" />
    </Link>

    {/* Menú desktop */}
    <container className="hidden sm:flex gap-6 text-md mt-4 sm:mt-0">
    <Link to="/" className="hover:text-primary">Inicio</Link>
    <Link to="/instalaciones" className="hover:text-primary">Instalaciones</Link>
    <Link to="/reservas" className="hover:text-primary">Reservas</Link>
    </container>

    <Link to="/login">
    <button className="bg-[#AE0F28] px-5 py-2 cursor-pointer rounded-lg text-white text-md font-medium shadow-md shadow-primary/30 hover:brightness-120 hover:scale-105 transition duration-300 ease-in-out hidden sm:flex">
    Iniciar sesión
    </button>
    </Link>
    
    {/* Hamburguesa solo en mobile */}
    <HamburgerMenu isOpen={isOpen} toggleOpen={toggleOpen} />
    </nav>
    {isOpen && (
    <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden"
    onClick={toggleOpen}
    ></div>
    )}

    {/* Menú mobile sidebar */}
    <aside
    className={`fixed top-0 left-0 h-screen w-64 bg-[#181818] text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-700 ease-in-out sm:hidden z-40`}
    >
    <div className="flex flex-col gap-6 p-6 mt-16">
        <Link to="/" onClick={toggleOpen}>Inicio</Link>
        <Link to="/instalaciones" onClick={toggleOpen}>Instalaciones</Link>
        <Link to="/reservas" onClick={toggleOpen}>Reservas</Link>
        <button className="bg-[#AE0F28] px-5 py-2 rounded-lg cursor-pointer text-white text-sm font-medium shadow-md shadow-primary/30 hover:brightness-120 hover:scale-105 transition duration-300 ease-in-out">
        <Link to="/login " onClick={toggleOpen}>Iniciar sesión</Link>
        </button>
        <Footer/>
    </div>
    </aside>
</header>
);
}

export default Navbar;
