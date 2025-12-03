import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import MascotasEmpty from "./MascotasEmpty";
import MascotasFormModal from "./MascotasFormModal";
import MascotasTable from "./MascotasTable";

function MascotasList() {
  const [mascotas, setMascotas] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mascotaEditando, setMascotaEditando] = useState(null);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMascotas();
    fetchTutores();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await fetch("/api/pacientes");
      if (response.ok) {
        const data = await response.json();
        setMascotas(data.data || []);
      }
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  const fetchTutores = async () => {
    try {
      const response = await fetch("/api/tutores");
      if (response.ok) {
        const data = await response.json();
        setTutores(data.data || []);
      }
    } catch (error) {
      console.error("Error al cargar tutores:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!globalThis.confirm("¿Eliminar esta mascota?")) return;

    try {
      const response = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchMascotas();
      } else {
        alert("Error al eliminar mascota");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleOpenModal = () => {
    setMascotaEditando(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMascotaEditando(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (mascotaEditando) {
        // Editar mascota existente
        const response = await fetch(`/api/pacientes/${mascotaEditando._id || mascotaEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          fetchMascotas();
          handleCloseModal();
        } else {
          const error = await response.json();
          alert(`Error: ${error.error || "No se pudo actualizar"}`);
        }
      } else {
        // Crear nueva mascota
        const response = await fetch("/api/pacientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          fetchMascotas();
          handleCloseModal();
        } else {
          const error = await response.json();
          alert(`Error: ${error.error || "No se pudo crear"}`);
        }
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="p-6">
      <Link to="/" className="inline-block mb-4">
        <button className="flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al Inicio
        </button>
      </Link>
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
      {!showList && mascotas.length === 0 ? (
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
            onEdit={(mascota) => {
              setMascotaEditando(mascota);
              setIsModalOpen(true);
            }}
          />
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <MascotasFormModal
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          mascota={mascotaEditando}
          tutores={tutores}
        />
      </Modal>
    </div>
  );
}

export default MascotasList;
