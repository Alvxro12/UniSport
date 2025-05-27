import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function InstalacionDetalle() {
    const { id } = useParams();
    const [sala, setSala] = useState(null);

    useEffect(() => {
        const fetchSala = async () => {
        const salaRef = doc(db, "salas", id);
        const salaSnap = await getDoc(salaRef);
        if (salaSnap.exists()) {
            setSala(salaSnap.data());
        }
        };
        fetchSala();
    }, [id]);

    if (!sala) return <div className="p-6 text-white">Cargando instalación...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#222222] to-[#342022] text-white">
        {/* Hero */}
        {sala.imagen && (
            <div className="relative w-full h-72 sm:h-96 overflow-hidden shadow-lg">
            <img
                src={sala.imagen}
                alt={sala.nombre}
                className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-md">
                {sala.nombre}
                </h1>
            </div>
            </div>
        )}

        {/* Información extendida */}
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 space-y-6">
            <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#F5E9D8]">Ubicación</h2>
            <p className="text-white/80 text-lg mt-1">{sala.ubicacion}</p>
            </div>

            <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#F5E9D8]">Capacidad</h2>
            <p className="text-white/80 text-lg mt-1">{sala.capacidad}</p>
            </div>

            <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#F5E9D8]">Descripción</h2>
            <p className="text-white/80 text-lg mt-1">{sala.descripcion}</p>
            </div>

            <div className="pt-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#F5E9D8]">Estado</h2>
            <p
                className={`text-lg font-bold mt-1 ${
                sala.disponible ? "text-green-400" : "text-red-400"
                }`}
            >
                {sala.disponible ? "Disponible" : "No disponible"}
            </p>
            </div>
        </div>
        </div>
    );
}

export default InstalacionDetalle;
