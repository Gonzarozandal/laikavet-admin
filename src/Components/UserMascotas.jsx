import { useState } from "react";

function UserMascotas({ mascotas, usuarioId, onMascotasChange }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    edad: "",
  });

  const handleAddMascota = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return;

    const nuevaMascota = {
      id: Date.now(),
      nombre: formData.nombre.trim(),
      especie: formData.especie.trim(),
      edad: formData.edad.trim(),
      dueno: usuarioId,
    };

    // Obtener mascotas del localStorage
    const stored = localStorage.getItem("mascotas");
    const allMascotas = stored ? JSON.parse(stored) : [];
    allMascotas.push(nuevaMascota);
    localStorage.setItem("mascotas", JSON.stringify(allMascotas));

    setFormData({ nombre: "", especie: "", edad: "" });
    setShowForm(false);
    onMascotasChange();
  };

  const handleDeleteMascota = (id) => {
    if (!globalThis.confirm("¿Eliminar esta mascota?")) return;

    const stored = localStorage.getItem("mascotas");
    if (stored) {
      const allMascotas = JSON.parse(stored);
      const updated = allMascotas.filter((m) => m.id !== id);
      localStorage.setItem("mascotas", JSON.stringify(updated));
      onMascotasChange();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">
          Mascotas del Usuario
          <span className="ml-2 text-blue-400">({mascotas.length})</span>
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Agregar Mascota
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <form onSubmit={handleAddMascota} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Nombre de la mascota"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Especie"
                value={formData.especie}
                onChange={(e) =>
                  setFormData({ ...formData, especie: e.target.value })
                }
                className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Edad"
                value={formData.edad}
                onChange={(e) =>
                  setFormData({ ...formData, edad: e.target.value })
                }
                className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-2"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de mascotas */}
      {mascotas.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p>No hay mascotas registradas para este usuario</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="bg-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-600 transition-colors"
            >
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {mascota.nombre}
                </h4>
                <p className="text-sm text-gray-300">
                  {mascota.especie} {mascota.edad && `• Edad: ${mascota.edad}`}
                </p>
              </div>
              <button
                onClick={() => handleDeleteMascota(mascota.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserMascotas;
