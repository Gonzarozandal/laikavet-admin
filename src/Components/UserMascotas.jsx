import { useState } from "react";

function UserMascotas({ mascotas, usuarioId, onMascotasChange }) {
  const [showForm, setShowForm] = useState(false);
  const [editingMascota, setEditingMascota] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    edad: "",
    sexo: "Macho",
    esteril: false,
  });

  const handleAddClick = () => {
    setEditingMascota(null);
    setFormData({
      nombre: "",
      especie: "",
      edad: "",
      sexo: "Macho",
      esteril: false,
    });
    setShowForm(true);
  };

  const handleEditClick = (mascota) => {
    setEditingMascota(mascota);
    setFormData({
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad: mascota.edad || "", // Assuming backend might not have age or it's date of birth
      sexo: mascota.sexo || "Macho",
      esteril: mascota.esteril || false,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return;

    const url = editingMascota
      ? `/api/pacientes/${editingMascota._id || editingMascota.id}`
      : "/api/pacientes";

    const method = editingMascota ? "PUT" : "POST";

    const body = {
      ...formData,
      tutor: usuarioId,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setFormData({ nombre: "", especie: "", edad: "", sexo: "Macho", esteril: false });
        setShowForm(false);
        setEditingMascota(null);
        onMascotasChange();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo guardar"}`);
      }
    } catch (error) {
      console.error("Error al guardar mascota:", error);
      alert("Error de conexión");
    }
  };

  const handleDeleteMascota = async (id) => {
    if (!globalThis.confirm("¿Eliminar esta mascota?")) return;

    try {
      const response = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onMascotasChange();
      } else {
        alert("Error al eliminar mascota");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error de conexión");
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
          onClick={handleAddClick}
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
          <h4 className="text-white font-semibold mb-4">
            {editingMascota ? "Editar Mascota" : "Nueva Mascota"}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nombre"
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
                required
              />
              <input
                type="text"
                placeholder="Edad / Fecha Nac"
                value={formData.edad}
                onChange={(e) =>
                  setFormData({ ...formData, edad: e.target.value })
                }
                className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-2"
              />
              <select
                value={formData.sexo}
                onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                className="bg-gray-600 border border-gray-500 text-white rounded px-3 py-2"
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
              <div className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={formData.esteril}
                  onChange={(e) => setFormData({ ...formData, esteril: e.target.checked })}
                  id="esteril"
                />
                <label htmlFor="esteril">Esterilizado</label>
              </div>
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
          <p>No hay mascotas registradas para este usuario</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mascotas.map((mascota) => (
            <div
              key={mascota._id || mascota.id}
              className="bg-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-600 transition-colors"
            >
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {mascota.nombre}
                </h4>
                <p className="text-sm text-gray-300">
                  {mascota.especie} • {mascota.sexo} {mascota.esteril ? "(Esterilizado)" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(mascota)}
                  className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900 hover:bg-opacity-30 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteMascota(mascota._id || mascota.id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserMascotas;
