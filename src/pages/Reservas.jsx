import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";

// --- Helpers para fechas seguras ---
function toDateSafe(v) {
    if (!v) return null;
    if (typeof v.toDate === "function") return v.toDate(); // Firestore Timestamp
    if (typeof v === "object" && typeof v.seconds === "number") return new Date(v.seconds * 1000);
    if (typeof v === "string") {
        const d = new Date(v);
        return isNaN(d.getTime()) ? null : d;
    }
    return null;
    }
    const fmtDate = (d) => (d ? d.toLocaleDateString() : "—");
    const fmtTime = (d) => (d ? d.toLocaleTimeString() : "—");

    function Reservas({ user }) {
    const [reservas, setReservas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchUID, setSearchUID] = useState("");
    const [cargando, setCargando] = useState(true);
    const [uidActualBuscado, setUidActualBuscado] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Cargar reservas por UID
    const cargarReservas = async (uid) => {
        try {
        setCargando(true);
        setErrorMsg("");

        // Tus documentos usan el campo "usuario" (no "userId")
        const q = query(collection(db, "reservas"), where("usuario", "==", uid));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((d) => {
            const raw = d.data();
            return {
            id: d.id,
            ...raw,
            // Normalización: jamás llamar .toDate() en el render
            fecha_reserva_date: toDateSafe(raw.fecha_reserva),
            hora_inicio_date: toDateSafe(raw.hora_inicio),
            hora_fin_date: toDateSafe(raw.hora_fin),
            };
        });

        setReservas(data);
        } catch (error) {
        console.error("Error al obtener reservas:", error);
        setErrorMsg(error?.code || error?.message || "Error al obtener reservas");
        setReservas([]);
        } finally {
        setCargando(false);
        }
    };

    //  Verificar rol y cargar reservas cuando user cambia
    useEffect(() => {
        if (!user) return;

        setUidActualBuscado(user.uid);
        cargarReservas(user.uid);

        const verificarRol = async () => {
        try {
            const docSnap = await getDoc(doc(db, "usuarios", user.uid));
            if (docSnap.exists() && docSnap.data().rol === "admin") {
            setIsAdmin(true);
            } else {
            setIsAdmin(false);
            }
        } catch (err) {
            console.error("Error al verificar rol:", err);
            setIsAdmin(false);
        }
        };

        verificarRol();
    }, [user]);

    // 🔍 Buscar reservas por UID (admin)
    const handleBuscar = () => {
        const limpio = searchUID.trim();
        const uidFinal = limpio || user.uid;
        setUidActualBuscado(uidFinal);
        cargarReservas(uidFinal);
    };

    if (!user) {
        return (
        <div className="min-h-screen bg-gradient-to-b from-[#222222] to-[#342022] text-white flex items-center justify-center">
            <p className="text-center text-white/70 text-lg">
            Debes iniciar sesión para ver tus reservas. <br />
            <a href="/UniSport/#/login" className="underline text-blue-400">Iniciar sesión</a>
            </p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#222222] to-[#342022] text-white p-6">
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-[#F5E9D8]">
                {isAdmin && uidActualBuscado !== user.uid
                ? `Historial de ${uidActualBuscado}`
                : "Mis Reservas"}
            </h1>

            {isAdmin && (
                <div className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Buscar por UID"
                    value={searchUID}
                    onChange={(e) => setSearchUID(e.target.value)}
                    className="px-4 py-2 bg-[#F5E9D8] rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#AE0F28]"
                />
                <button
                    onClick={handleBuscar}
                    className="bg-[#AE0F28] text-white px-4 py-2 rounded-md hover:brightness-110 transition-all flex items-center gap-2"
                >
                    <FaSearch /> Buscar
                </button>
                </div>
            )}
            </div>

            {cargando ? (
            <p className="text-center text-white/70">Cargando reservas...</p>
            ) : errorMsg ? (
            <p className="text-center text-red-300">Error: {errorMsg}</p>
            ) : reservas.length === 0 ? (
            <p className="text-center text-white/70">No se encontraron reservas.</p>
            ) : (
            <div className="space-y-6">
                {reservas.map((reserva) => (
                <div
                    key={reserva.id}
                    className="bg-[#F5E9D8] text-[#222] p-6 rounded-xl shadow-md"
                >
                    <h2 className="text-xl font-bold text-[#AE0F28] mb-2">
                    {reserva.nombre_sala ?? reserva.id}
                    </h2>

                    <div className="flex items-center gap-2 text-sm mb-1">
                    <FaCalendarAlt className="text-[#AE0F28]" />
                    <span>
                        <strong>Fecha:</strong> {fmtDate(reserva.fecha_reserva_date)}
                    </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-[#AE0F28]" />
                    <span>
                        <strong>Hora:</strong> {fmtTime(reserva.hora_inicio_date)}
                        {reserva.hora_fin_date ? ` - ${fmtTime(reserva.hora_fin_date)}` : ""}
                    </span>
                    </div>

                    <span
                    className={`inline-block mt-4 px-4 py-1 text-sm font-medium rounded-full ${
                        reserva.estado === "activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    >
                    {reserva.estado ?? "—"}
                    </span>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}

export default Reservas;
