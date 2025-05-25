function Footer() {
return (
<footer className="bg-transparent py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
    <img src="/src/assets/images/logo_unisport_white.png" alt="UniSport" className="h-40" />
    <ul className="flex gap-10 mx-85 text-sm text-white/70">
        <li><a href="#inicio" className="hover:text-white transition">Inicio</a></li>
        <li><a href="#afiliados" className="hover:text-white transition">Afiliados</a></li>
        <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
    </ul>
    <p className="text-xs text-white/50">© 2025 UniSport. Todos los derechos reservados.</p>
    </div>
</footer>
);
}

export default Footer;
