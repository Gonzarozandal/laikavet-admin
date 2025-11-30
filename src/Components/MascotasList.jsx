import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import MascotasEmpty from "./MascotasEmpty";
import MascotasFormModal from "./MascotasFormModal";
import MascotasTable from "./MascotasTable";

function MascotasList() {
  const [mascotas, setMascotas] = useState([]);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mascotaEditando, setMascotaEditando] = useState(null);
  const [showList, setShowList] = useState(false);

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

  const handleDelete = (id) => {
    if (!globalThis.confirm("¿Eliminar esta mascota?")) return;
    setMascotas(mascotas.filter((m) => m.id !== id));
  };

  const handleOpenModal = () => {
    setMascotaEditando(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMascotaEditando(null);
  };

  const handleSubmit = (formData) => {
    if (mascotaEditando) {
      // Editar mascota existente
      setMascotas(
        mascotas.map((m) =>
          m.id === mascotaEditando.id ? { ...m, ...formData } : m
        )
      );
    } else {
      // Crear nueva mascota
      const nueva = {
        id: Date.now(),
        ...formData,
      };
      setMascotas([nueva, ...mascotas]);
    }
    handleCloseModal();
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
              setShowList(true);
              handleOpenModal();
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

      {/* la sección principal queda oculta hasta que se haga click en agregar */}
      {!showList ? (
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

          <MascotasTable
            mascotas={mascotas}
            query={query}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <MascotasFormModal
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          mascota={mascotaEditando}
        />
      </Modal>
    </div>
  );
}

export default MascotasList;
