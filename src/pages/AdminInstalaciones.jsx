import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";

function AdminInstalaciones({ user }) {
const [salas, setSalas] = useState([]);
const [modo, setModo] = useState("crear"); // o "editar"
const [editingId, setEditingId] = useState(null);
const [formSala, setFormSala] = useState({
nombre: "",
tipo_de_sala: '',
descripcion: "",
capacidad: "",
ubicacion: "",
disponible: true,
imagen: "",
});

useEffect(() => {
const fetchSalas = async () => {
    const querySnapshot = await getDocs(collection(db, "salas"));
    const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    }));
    setSalas(data);
};
fetchSalas();
}, []);

const resetForm = () => {
setFormSala({
    nombre: "",
    tipo_de_sala: '',
    descripcion: "",
    capacidad: "",
    ubicacion: "",
    disponible: true,
    imagen: "",
});
setModo("crear");
setEditingId(null);
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
    if (modo === "crear") {
    await addDoc(collection(db, "salas"), {
        ...formSala,
        disponible: formSala.disponible === "true" || formSala.disponible === true,
    });
    } else if (modo === "editar" && editingId) {
    const salaRef = doc(db, "salas", editingId);
    await updateDoc(salaRef, {
        ...formSala,
        disponible: formSala.disponible === "true" || formSala.disponible === true,
    });
    }

    // actualizar lista
    const snapshot = await getDocs(collection(db, "salas"));
    const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    }));
    setSalas(data);
    resetForm();
} catch (err) {
    alert("Error al guardar: " + err.message);
}
};

const handleEdit = (sala) => {
setFormSala(sala);
setModo("editar");
setEditingId(sala.id);
};

const handleDelete = async (id) => {
if (window.confirm("¿Eliminar esta instalación?")) {
    await deleteDoc(doc(db, "salas", id));
    setSalas(salas.filter(s => s.id !== id));
}
};

if (user?.rol !== "admin") {
return (
<div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="bg-[#F5E9D8] text-[#AE0F28] px-6 py-4 rounded-lg shadow-md text-center font-semibold">
    Acceso denegado: esta sección es solo para administradores.
    </div>
</div>
);
}

return (
<div className="min-h-screen p-6 bg-transparent">
<h1 className="text-3xl font-bold text-[#F5E9D8] mb-6 text-center">Gestión de Instalaciones</h1>

{/* Formulario */}
<div className="bg-[#F5E9D8] text-black p-6 rounded-lg shadow-lg mb-8 max-w-xl mx-auto">
    <h2 className="text-xl font-semibold text-[#AE0F28] mb-4">
    {modo === "crear" ? "Nueva instalación" : "Editar instalación"}
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    {["nombre", "tipo de sala", "descripcion", "ubicacion", "capacidad", "imagen"].map((campo) => (
        <input
        key={campo}
        type="text"
        placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
        value={formSala[campo]}
        onChange={(e) => setFormSala({ ...formSala, [campo]: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AE0F28]"
        required={campo !== "imagen"}
        />
    ))}
    <select
        value={formSala.disponible}
        onChange={(e) => setFormSala({ ...formSala, disponible: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AE0F28]"
    >
        <option value="true">Disponible</option>
        <option value="false">No disponible</option>
    </select>
    <div className="flex justify-end gap-4 pt-2">
        <button
        type="button"
        onClick={resetForm}
        className="text-red-600 hover:underline font-medium"
        >
        Cancelar
        </button>
        <button
        type="submit"
        className="bg-[#AE0F28] hover:brightness-110 text-white px-4 py-2 rounded-md font-medium"
        >
        {modo === "crear" ? "Guardar" : "Actualizar"}
        </button>
    </div>
    </form>
</div>

{/* Lista de instalaciones */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {salas.map((sala) => (
    <div
        key={sala.id}
        className="bg-[#F5E9D8] text-black p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
        {sala.imagen && (
        <img
            src={sala.imagen}
            className="w-full h-40 object-cover rounded-md mb-3"
        />
        )}
        <h3 className="text-lg font-bold text-[#AE0F28]">{sala.nombre}</h3>
        <p className="text-sm text-gray-800">{sala.descripcion}</p>
        <p className="text-sm text-gray-700">Ubicación: {sala.ubicacion}</p>
        <p className="text-sm text-gray-700">Capacidad: {sala.capacidad}</p>
        <p className={`text-sm font-semibold ${sala.disponible === "true" || sala.disponible === true ? "text-green-600" : "text-red-600"}`}>
        {sala.disponible === "true" || sala.disponible === true ? "Disponible" : "No disponible"}
        </p>
        <div className="flex justify-between mt-4 text-sm font-medium">
        <button
            onClick={() => handleEdit(sala)}
            className="text-blue-600 hover:underline"
        >
            Editar
        </button>
        <button
            onClick={() => handleDelete(sala.id)}
            className="text-red-600 hover:underline"
        >
            Eliminar
        </button>
        </div>
    </div>
    ))}
</div>
</div>
);
}

export default AdminInstalaciones;
