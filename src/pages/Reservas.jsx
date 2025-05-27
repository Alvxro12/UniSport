import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {collection,query,where,getDocs,doc,getDoc} from "firebase/firestore";
    import { FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";

    function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchUID, setSearchUID] = useState("");
    const [cargando, setCargando] = useState(true);
    const [miUID, setMiUID] = useState("");
    const [uidActualBuscado, setUidActualBuscado] = useState("");


    //Cargar reservas
    const cargarReservas = async (uid) => {
        try {
        setCargando(true);
        const q = query(collection(db, "reservas"), where("usuario", "==", uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setReservas(data);
        } catch (error) {
        console.error("Error al obtener reservas:", error);
        } finally {
        setCargando(false);
        }
    };

    //Detectar usuario y rol
    useEffect(() => {
        const obtenerUsuario = async () => {
        const user = auth.currentUser;
        if (!user) return;

        setMiUID(user.uid);
        await cargarReservas(user.uid);

        try {
            const userDoc = await getDoc(doc(db, "usuarios", user.uid));
            if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.rol === "admin") {
                setIsAdmin(true);
            }
            }
        } catch (e) {
            console.error("Error al verificar rol:", e);
        }
        };

        obtenerUsuario();
    }, []);

const handleBuscar = () => {
    const limpio = searchUID.trim();

    // Si está vacío, volver a mostrar tus propias reservas
    if (limpio === "") {
        setUidActualBuscado("");
        cargarReservas(miUID);
        return;
    }

    // Buscar UID ajeno
    setUidActualBuscado(limpio);
    cargarReservas(limpio);
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-[#222222] to-[#342022] text-white p-6">
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-[#F5E9D8]">
            {isAdmin && uidActualBuscado && uidActualBuscado !== miUID
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
                    {reserva.nombre_sala}
                    </h2>

                    <div className="flex items-center gap-2 text-sm mb-1">
                    <FaCalendarAlt className="text-[#AE0F28]" />
                    <span>
                        <strong>Fecha:</strong> {reserva.fecha_reserva}
                    </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-[#AE0F28]" />
                    <span>
                        <strong>Hora:</strong> {reserva.hora_inicio}
                        {reserva.hora_fin && ` - ${reserva.hora_fin}`}
                    </span>
                    </div>

                    <span
                    className={`inline-block mt-4 px-4 py-1 text-sm font-medium rounded-full ${
                        reserva.estado === "activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    >
                    {reserva.estado}
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
