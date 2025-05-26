import { FaFacebookF, FaGoogle, FaApple, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
return (
<div
className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
style={{ backgroundImage: "url('/UniSport/background_login2.png')" }}
>
    <div className="bg-[#F5EAD9] rounded-2xl shadow-xl p-8 w-full max-w-md">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log in</h2>

    <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border  border-gray-300 focus:border-[#AE0F28] focus:outline-none rounded-lg mb-4 text-black"
    />

        <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 border focus:border-[#AE0F28] focus:outline-none border-gray-300  rounded-lg mb-4 text-black"
    />

            <button className="w-full bg-[#AE0F28] text-white py-2 rounded-full hover: cursor-pointer mb-4"><Link to="/instalaciones">Continuar</Link>
        </button>

<h2 className="text-black text-center text-sm">
    ¿No tienes cuenta?{" "}
    <Link to="/Register" className="text-[#AE0F28] underline hover:text-[#8e0c20]">
    ¡Regístrate aquí!
    </Link>
</h2>


    <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">O</span>
        <hr className="flex-grow border-gray-300" />
    </div>

    <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 border border-black py-2 rounded-full text-black bg-white hover:bg-[#AE0F28] hover:text-white transition">
        <FaFacebookF className="text-blue-600" />
        Continua con Facebook
        </button>
        <button className="flex items-center justify-center gap-3 border border-black py-2 rounded-full text-black bg-white hover:bg-[#AE0F28] hover:text-white  transition">
        <FaGoogle className="text-red-500" />
        Continua con Google
        </button>
        <button className="flex items-center justify-center gap-3 border border-black py-2 rounded-full bg-white text-black hover:bg-[#AE0F28] hover:text-white transition">
        <FaApple className="text-black" />
        Continua con Apple
        </button>
        <button className="flex items-center justify-center gap-3 border border-black py-2 rounded-full text-black bg-white hover:bg-[#AE0F28] hover:text-white  transition">
        <FaPhoneAlt className="text-gray-600" />
        Continua con tu telefono
        </button>
    </div>
    </div>
</div>
);
}

export default Login;
