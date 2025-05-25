function WhyUniSport() {
const cards = [
{
    title: 'Reservas rápidas',
    description: 'Gestiona tus espacios deportivos en segundos desde tu celular.',
    icon: '/src/assets/images/reserva_clara.png',
},
{
    title: 'Información clara',
    description: 'Consulta disponibilidad, horarios y detalles sin perder tiempo.',
    icon: '/src/assets/images/agenda_clara.png',
},
{
    title: 'Pensado para estudiantes',
    description: 'Hecho para ti: intuitivo, práctico y completamente gratuito.',
    icon: '/src/assets/images/comunidad_clara.png',
},
];


return (
<section className="bg-transparent text-white py-16 px-6 sm:px-16">
    <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        ¿Por qué usar <span className="text-[#AE0F28]">UniSport</span>?
    </h2>

    <div className="grid gap-y-10 gap-x-6 sm:grid-cols-3 mt-10 rounded-xl hover:border-primary shadow-lg shadow-primary/10 hover:brightness-110 transition duration-500">
        {cards.map((card, index) => (
        <div
            key={index}
            className="group [perspective:1000px] w-full h-64 sm:h-72"
        >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] sm:hover:[transform:rotateY(180deg)]">

            {/* FRONT (solo visible en desktop) */}
            <div className="absolute w-full h-full backface-hidden overflow-hidden rounded-lg sm:flex hidden">
            <img
                src={card.icon}
                alt={card.title}
                className="w-full h-full object-cover"
            />
            </div>


            {/* BACK (siempre visible en mobile, visible en flip en desktop) */}
            <div className="absolute w-full h-full sm:backface-hidden sm:rotate-y-180 bg-white text-[#222222] border border-primary/40 rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-primary mb-2">{card.title}</h3>
            <p className="text-[#444] text-sm text-center">{card.description}</p>
            </div>


            </div>
        </div>
        ))}
    </div>
    </div>
</section>
);
}

export default WhyUniSport;
