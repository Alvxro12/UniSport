import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase"; // importa auth aquí

function CTAFinal() {
    const navigate = useNavigate();

    const irAInstalaciones = () => {
        if (auth.currentUser) {
        navigate("/instalaciones");
        } else {
        navigate("/login");
        }
    };

    return (
        <section className="bg-transparent text-white py-16 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para transformar tu experiencia deportiva?
        </h2>
        <p className="text-white/90 max-w-xl mx-auto mb-8">
            Reserva tus espacios, planifica tus entrenamientos y conecta con tu comunidad universitaria desde UniSport.
        </p>
        <button
            onClick={irAInstalaciones} // ✅ correcto en React
            className="bg-[#AE0F28] text-[#F5E9D8] font-semibold px-6 py-3 rounded-md hover:bg-[#F5E9D8] hover:text-[#AE0F28] transition"
        >
            Comenzar ahora
        </button>
        </section>
    );
    }

export default CTAFinal;
