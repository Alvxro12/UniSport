import WhyUniSport from "../components/why_unisport";
import Afiliados from "../components/screen_afiliados";
import CTAFinal from "../components/cta_landing";
import Footer from "../components/footer";
import Imagen from "../components/imagenes";
import herosection_reserva from "../assets/images/herosection_reserva.png"


function Landing() {
return (
    <>
<section className="relative flex flex-col-reverse sm:flex-row items-center justify-between px-6 sm:px-16 py-16 bg-overflow-hidden">
    {/* Imagen deportiva con fondo transparente */}
    <Imagen
    src={herosection_reserva}
    alt="Imagen de una persona reservando un lugar de deportes"
    className="w-[280px] sm:w-[420px] flex"
    />
    
    {/* Texto principal */}
    <div className="max-w-xl text-center sm:text-start">
    <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
        <span className="text-primary text-[#AE0F28]"> EMPIEZA </span> TU VIAJE ATLETICO
    </h1>
    <p className="text-white/80 mt-4">
        Eleva tu juego reservando las mejores instalaciones de primer nivel, planea tus entrenamientos y triunfa en el mundo deportivo.
    </p>
    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
    <button className="bg-[#AE0F28] text-white px-6 py-3 rounded-md cursor-pointer border border-white font-semibold transition active:scale-95 sm:hover:bg-transparent sm:hover:text-white sm:hover:scale-105">
    ¡Reserva ahora!
    </button>

        <button className="bg-[#F5E9D8] cursor-pointer border border-white text-[#AE0F28] px-6 py-3 rounded-md font-medium hover:bg-white-200">
        Ver canchas disponibles.
        </button>
    </div>
    </div>
</section>
<WhyUniSport />
<Afiliados/>
<CTAFinal/>
<Footer/>
</>
);
}
export default Landing;
