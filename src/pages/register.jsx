import { Link } from "react-router-dom";

function Register() {
return (
<div
    className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
    style={{ backgroundImage: "url('/UniSport/background_login2.png')" }}
>
    <div className="bg-[#F5EAD9] rounded-2xl shadow-xl p-8 w-full max-w-md">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Crear cuenta
    </h2>

    <input
        type="text"
        placeholder="Nombre completo"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />
    <input
        type="text"
        placeholder="Usuario"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />
    <input
        type="date"
        placeholder="Usuario"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />
    <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />
    <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />
        <input
        type="password"
        placeholder="Repite la contraseña"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />

    <button className="w-full bg-[#AE0F28] text-white py-2 rounded-full hover:brightness-110 transition mb-4">
        Registrarse
    </button>

    <p className="text-black text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-[#AE0F28] underline hover:text-[#8e0c20]">
        Inicia sesión aquí
        </Link>
    </p>
    </div>
</div>
);
}

export default Register;
