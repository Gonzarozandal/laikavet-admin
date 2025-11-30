import React, { useEffect, useState } from "react";
import MascotasEmpty from "./MascotasEmpty";
import MascotasForm from "./MascotasForm";
import MascotasTable from "./MascotasTable";

function MascotasList() {
  const [mascotas, setMascotas] = useState([]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ nombre: "", especie: "", edad: "" });
  const [open, setOpen] = useState(false); // controla si la sección se muestra

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mascotas");
      if (stored) setMascotas(JSON.parse(stored));
    } catch (e) {
      console.warn("No se pudo leer mascotas desde localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("mascotas", JSON.stringify(mascotas));
    } catch (e) {
      console.warn("No se pudo guardar mascotas en localStorage", e);
    }
  }, [mascotas]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    const nueva = {
      id: Date.now(),
      nombre: form.nombre.trim(),
      especie: form.especie.trim(),
      edad: form.edad.trim(),
    };
    setMascotas([nueva, ...mascotas]);
    setForm({ nombre: "", especie: "", edad: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar esta mascota?")) return;
    setMascotas(mascotas.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <div className="text-3xl font-extrabold text-white flex items-center gap-3">
            <span className="text-2xl">🐾</span>
            <div>
              <div>Historial Clínico</div>
              <div className="text-sm text-gray-400">
                Gestiona la información de tus pacientes
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              // abrir la sección y luego enfocar el input nombre
              setOpen(true);
              setTimeout(() => {
                const el = document.querySelector('input[name="nombre"]');
                if (el) el.focus();
              }, 60);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar Mascota
          </button>
        </div>
      </header>

      {/* la sección principal queda oculta hasta que `open` sea true */}
      {!open ? (
        <MascotasEmpty />
      ) : (
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="mb-4">
            <input
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              placeholder="Buscar por nombre, especie o edad..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <MascotasForm
            form={form}
            onchange={handleChange}
            onSubmit={handleAdd}
          />
          <MascotasTable
            mascotas={mascotas}
            query={query}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default MascotasList;
