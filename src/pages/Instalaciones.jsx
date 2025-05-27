import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import {collection,getDocs,addDoc,updateDoc,doc,query,where,Timestamp,runTransaction,
} from "firebase/firestore";

function Instalaciones() {
const [salas, setSalas] = useState([]);
const [filteredSalas, setFilteredSalas] = useState([]);
const [misReservas, setMisReservas] = useState([]);
const [expandedId, setExpandedId] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const [tipoFiltro, setTipoFiltro] = useState("todos");
const navigate = useNavigate();
const [disponibilidadFiltro, setDisponibilidadFiltro] = useState("todas");
const [mensaje, setMensaje] = useState(null);

// 1. Fetch salas
const fetchSalas = async () => {
const snap = await getDocs(collection(db, "salas"));
const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
setSalas(data);
setFilteredSalas(data);
};

// 2. Fetch mis reservas activas
const fetchMisReservas = async () => {
if (!auth.currentUser) {
    setMisReservas([]);
    return;
}
const q = query(
    collection(db, "reservas"),
    where("usuario", "==", auth.currentUser.uid),
    where("estado", "==", "activa")
);
const snap = await getDocs(q);
setMisReservas(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
};

useEffect(() => {
fetchSalas();
fetchMisReservas();
}, []);

// Refrescar datos
const refreshAll = async () => {
await Promise.all([fetchSalas(), fetchMisReservas()]);
};

// 3. handleReservar con transacción
const handleReservar = async (sala) => {
if (!auth.currentUser) {
    setMensaje("Debes iniciar sesión.");
    setTimeout(() => setMensaje(null), 3000);
    return;
}
// Evitar doble reserva
if (misReservas.some((r) => r.id_sala === sala.id)) {
    setMensaje("Ya tienes una reserva activa en esta sala.");
    setTimeout(() => setMensaje(null), 3000);
    return;
}

const salaRef = doc(db, "salas", sala.id);

try {
    await runTransaction(db, async (tx) => {
    const sDoc = await tx.get(salaRef);
    if (!sDoc.exists()) throw "Sala no encontrada.";
    if (!sDoc.data().disponible) throw "La sala ya no está disponible.";

    // Crear reserva
    const nuevaResRef = doc(collection(db, "reservas"));
    tx.set(nuevaResRef, {
        usuario: auth.currentUser.uid,
        id_sala: sala.id,
        nombre_sala: sala.nombre,
        fecha_reserva: Timestamp.now(),
        hora_inicio: Timestamp.now(),
        hora_fin: null,
        estado: "activa",
    });
    // Marcar sala ocupada
    tx.update(salaRef, { disponible: false });
    });

    setMensaje("✅ ¡Reserva realizada!");
    await refreshAll();
} catch (error) {
    console.error(error);
    setMensaje(
    "❌ " +
        (typeof error === "string" ? error : "Error al reservar.")
    );
}
setTimeout(() => setMensaje(null), 3000);
};

// 4. handleCancelar
const handleCancelar = async (sala) => {
const reserva = misReservas.find((r) => r.id_sala === sala.id);
if (!reserva) return;

const reservaRef = doc(db, "reservas", reserva.id);
const salaRef = doc(db, "salas", sala.id);

try {
    await updateDoc(reservaRef, {
    estado: "cancelada",
    hora_fin: Timestamp.now(),
    });
    await updateDoc(salaRef, { disponible: true });

    setMensaje("✅ Reserva cancelada.");
    await refreshAll();
} catch (e) {
    console.error(e);
    setMensaje("❌ Error al cancelar.");
}
setTimeout(() => setMensaje(null), 3000);
};

// Filtros
useEffect(() => {
let resultado = salas;
if (searchTerm) {
    resultado = resultado.filter((s) =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
if (tipoFiltro !== "todos") {
    resultado = resultado.filter(
    (s) => s.tipo_de_sala === tipoFiltro
    );
}
if (disponibilidadFiltro !== "todas") {
    const disponible = disponibilidadFiltro === "disponible";
    resultado = resultado.filter((s) => s.disponible === disponible);
}
setFilteredSalas(resultado);
}, [searchTerm, tipoFiltro, disponibilidadFiltro, salas]);

const tiposUnicos = [...new Set(salas.map((s) => s.tipo_de_sala))];

const toggleExpand = (id) =>
setExpandedId(expandedId === id ? null : id);

return (
<div className="min-h-screen bg-transparent p-6">
    {/* Filtros */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <h1 className="text-3xl font-bold text-[#F5E9D8]">
        Instalaciones
    </h1>
    <div className="flex flex-wrap gap-3 items-center">
        <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#F5E9D8] border border-[#AE0F28] text-black focus:ring-3 focus:ring-[#AE0F28]"
        />
        <select
        value={tipoFiltro}
        onChange={(e) => setTipoFiltro(e.target.value)}
        className="px-3 py-2 rounded-md border bg-[#F5E9D8] border-gray-300 text-black focus:ring-2 focus:ring-[#AE0F28]"
        >
        <option value="todos">Todos los tipos</option>
        {tiposUnicos.map((tipo) => (
            <option key={tipo} value={tipo}>
            {tipo}
            </option>
        ))}
        </select>
        <select
        value={disponibilidadFiltro}
        onChange={(e) => setDisponibilidadFiltro(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#F5E9D8] border border-gray-300 text-black focus:ring-2 focus:ring-[#AE0F28]"
        >
        <option value="todas">Todas</option>
        <option value="disponible">Disponible</option>
        <option value="no_disponible">No disponible</option>
        </select>
    </div>
    </div>

    {/* Tarjetas de salas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredSalas.map((sala) => {
        const tuReserva = misReservas.find(
        (r) => r.id_sala === sala.id
        );
        const isExpanded = expandedId === sala.id;
        return (
        <div
            key={sala.id}
            className="relative group bg-[#F5E9D8] p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
        >
            <div onClick={() => navigate(`/instalacion/${sala.id}`)}>
            {sala.imagen && (
                <img
                src={sala.imagen}
                alt={`Imagen de ${sala.nombre}`}
                className="w-full h-40 object-cover rounded-md mb-2"
                />
            )}
            <h2 className="text-xl font-semibold text-[#AE0F28]">
                {sala.tipo_de_sala} - {sala.nombre}
            </h2>
            <p className="text-gray-700">
                Capacidad: {sala.capacidad}
            </p>
            <p
                className={`mt-1 font-medium ${
                sala.disponible
                    ? "text-green-600"
                    : "text-red-500"
                }`}
            >
                {sala.disponible ? "Disponible" : "No disponible"}
            </p>
            {isExpanded && (
                <div className="mt-4 text-gray-700 text-sm space-y-2">
                <p>
                    <strong>Ubicación:</strong> {sala.ubicacion}
                </p>
                <p>
                    <strong>Descripción:</strong> {sala.descripcion}
                </p>
                </div>
            )}
            </div>

            {/* Botón de acción */}
            {tuReserva ? (
            <button
                onClick={(e) => {
                e.stopPropagation();
                handleCancelar(sala);
                }}
                className="mt-4 w-full py-2 rounded bg-[#AE0F28] text-white hover:brightness-110"
            >
                Cancelar reserva
            </button>
            ) : sala.disponible ? (
            <button
                onClick={(e) => {
                e.stopPropagation();
                handleReservar(sala);
                }}
                className="mt-4 w-full py-2 rounded bg-[#AE0F28] text-white hover:brightness-110 shadow-md hover:scale-[1.01] transition-all"
            >
                Reservar
            </button>
            ) : (
            <button
                disabled
                className="mt-4 w-full py-2 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
            >
                Ocupada
            </button>
            )}
        </div>
        );
    })}
    </div>

    {/* Mensaje flotante */}
    {mensaje && (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#AE0F28] text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-fade-in z-50">
        {mensaje}
    </div>
    )}
</div>
);
}

export default Instalaciones;