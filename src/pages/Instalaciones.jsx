import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Instalaciones() {
    const [salas, setSalas] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
    const fetchSalas = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, "salas"));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setSalas(data);
        } catch (error) {
        console.error("Error al obtener salas:", error);
        }
    };

    fetchSalas();
    }, []);

    const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    };

    return (
    <div className="min-h-screen bg-transparent p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#F5E9D8]">Instalaciones</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {salas.map((sala) => {
            const isExpanded = expandedId === sala.id;
            const disponibilidad = sala.disponible ? "Disponible" : "No disponible";
            const disponibilidadClass = sala.disponible ? "text-green-600" : "text-red-500";
            const buttonDisabled = !sala.disponible;

            return (
            <div
                key={sala.id}
                className={`bg-[#F5E9D8] p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                isExpanded ? "col-span-1 sm:col-span-2 md:col-span-1" : ""
                }`}
                onClick={() => window.open(`/instalacion/${sala.id}`, "_blank")}
            >
                {sala.imagen && (
                <img
                    src={sala.imagen}
                    alt={`Imagen de ${sala.nombre}`}
                    className="w-full h-40 object-cover rounded-md mb-2"
                />
                )}

                <h2 className="text-xl font-semibold text-[#AE0F28]">{sala.tipo_de_sala} - {sala.nombre}</h2>
                <p className="text-gray-700">Capacidad: {sala.capacidad}</p>
                <p className={`mt-1 font-medium ${disponibilidadClass}`}>
                {disponibilidad}
                </p>

                {isExpanded && (
                <div className="mt-4 text-gray-700 text-sm space-y-2">
                    <p><strong>Ubicación:</strong> {sala.ubicacion}</p>
                    <p><strong>Descripción:</strong> {sala.descripcion}</p>
                </div>
                )}

                <button
                disabled={buttonDisabled}
                className={`mt-4 w-full py-2 rounded ${
                    buttonDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#AE0F28] text-white hover:brightness-110"
                }`}
                >
                Reservar
                </button>
            </div>
            );
        })}
        </div>
    </div>
    );
    }

export default Instalaciones;
