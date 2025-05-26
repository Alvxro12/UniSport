import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/Authservice";

function Register() {
const location = useLocation();
const [nombre, setNombre] = useState("");
const [correo, setCorreo] = useState("");
const [contraseña, setContraseña] = useState("");
const [confirmarContraseña, setConfirmarContraseña] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

if (contraseña !== confirmarContraseña) {
    setError("Las contraseñas no coinciden.");
    return;
}

try {
    const user = await registerUser(nombre, correo, contraseña);
    const destino = location.state?.from || "/instalaciones";
    navigate(destino);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya está en uso.");
        } else {
        setError("Ocurrió un error al registrarse. Inténtalo más tarde.");
        }
    }
};

return (
<div
    className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
    style={{ backgroundImage: "url('/UniSport/background_login2.png')" }}
>
    <form
    onSubmit={handleRegister}
    className="bg-[#F5EAD9] rounded-2xl shadow-xl p-8 w-full max-w-md"
    >
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Crear cuenta
    </h2>

    <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />

    <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />

    <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />

    <input
        type="password"
        placeholder="Repite la contraseña"
        value={confirmarContraseña}
        onChange={(e) => setConfirmarContraseña(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-[#AE0F28] focus:ring-2 focus:ring-[#AE0F28]"
    />

    {error && (
        <p className="text-red-600 text-sm text-center font-medium mb-4">
        {error}
        </p>
    )}

    <button
        type="submit"
        className="w-full bg-[#AE0F28] cursor-pointer text-white px-4 py-2 rounded-full hover:brightness-110 transition mb-4"
    >
        Registrarse
    </button>

    <p className="text-black text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-[#AE0F28] underline hover:text-[#8e0c20]">
        Inicia sesión aquí
        </Link>
    </p>
    </form>
</div>
);
}

export default Register;
