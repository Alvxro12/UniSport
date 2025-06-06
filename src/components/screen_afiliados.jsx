function Afiliados() {
const base = import.meta.env.BASE_URL;

const afiliados = [
{
    nombre: 'Universidad de la costa',
    logo: `${base}Logo_cuc.png`,
},
{
    nombre: 'Universidad Simon Bolivar',
    logo: `${base}Unisimon_logo_25.png`,
},
{
    nombre: 'Universidad del norte',
    logo: `${base}logo-uninorte.png`,
},
{
    nombre: 'Universidad del atlantico',
    logo: `${base}Logo_de_la_Universidad_del_Atlántico.svg.png`,
},
{
    nombre: 'Universidad Libre',
    logo: `${base}logo-unilibre.png`,
},
];


return (
<section className="bg-transparent py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <h2 className="text-center text-2xl font-semibold text-white/90 tracking-wide sm:text-3xl mb-12">
        Instituciones afiliadas a <span className="text-[#AE0F28] font-bold">UniSport</span>
    </h2>

    <div className="bg-[#F5E9D8] rounded-xl p-10 shadow-lg">
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {afiliados.map((afiliado, index) => (
            <img
            key={index}
            src={afiliado.logo}
            alt={afiliado.nombre}
            className="max-h-12 w-full object-contain transition"
            />
        ))}
        </div>
    </div>
    </div>
</section>
);
}

export default Afiliados;
