import { useEffect, useState } from "react";

function Reservas() {
const [reservas, setReservas] = useState([]);

useEffect(() => {
// Simulación de reservas
setReservas([
    {
    id: "r1",
    sala: "Cancha de fútbol",
    fecha: "2025-05-26",
    inicio: "14:00",
    fin: "15:00",
    estado: "activa",
    },
    {
    id: "r2",
    sala: "Gimnasio",
    fecha: "2025-05-20",
    inicio: "10:00",
    fin: "11:00",
    estado: "finalizada",
    },
        {
    id: "r2",
    sala: "Gimnasio",
    fecha: "2025-05-20",
    inicio: "10:00",
    fin: "11:00",
    estado: "finalizada",
    },
        {
    id: "r2",
    sala: "Gimnasio",
    fecha: "2025-05-20",
    inicio: "10:00",
    fin: "11:00",
    estado: "finalizada",
    },
]);
}, []);

return (
<div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold mb-6 text-[#AE0F28]">Mis Reservas</h1>
    <div className="space-y-4">
    {reservas.map((reserva) => (
        <div key={reserva.id} className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-[#AE0F28]">{reserva.sala}</h2>
        <p className="text-gray-700">Fecha: {reserva.fecha}</p>
        <p className="text-gray-700">Hora: {reserva.inicio} - {reserva.fin}</p>
        <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${reserva.estado === "activa"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
            }`}>
            {reserva.estado}
        </span>
        </div>
    ))}
    </div>
</div>
);
}

export default Reservas;
