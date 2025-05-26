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
        <div className="min-h-screen bg-transparent text-white">
        {/* Hero Section */}
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

        {/* Detalle */}
        <div className="max-w-3xl mx-auto p-6 mt-6 bg-[#F5E9D8] text-[#222] rounded-xl shadow-xl space-y-4">
            <p className="text-lg">
            <strong>Ubicación:</strong> {sala.ubicacion}
            </p>
            <p className="text-lg">
            <strong>Capacidad:</strong> {sala.capacidad}
            </p>
            <p className="text-lg">
            <strong>Descripción:</strong> {sala.descripcion}
            </p>
            <p
            className={`text-lg font-semibold ${
                sala.disponible ? "text-green-600" : "text-red-600"
            }`}
            >
            {sala.disponible ? "Disponible" : "No disponible"}
            </p>
        </div>
        </div>
    );
}

export default InstalacionDetalle;
