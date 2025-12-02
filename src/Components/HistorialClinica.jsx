import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import FormPaciente from "./FormUsers";

function HistorialClinica() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propietarios, setPropietarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [propietarioEditando, setPropietarioEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPropietarios();
  }, []);

  const fetchPropietarios = async () => {
    console.log("🔍 Cargando propietarios...");
    try {
      const response = await fetch("http://localhost:3000/api/duenos/");

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Datos recibidos:", data);
        setPropietarios(data);
      } else {
        console.error("❌ Error al cargar. Status:", response.status);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setPropietarioEditando(null); // Limpiar cualquier dato de edición
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPropietarioEditando(null);
  };

  const handleSubmit = async (formData) => {
    console.log("📤 Datos a enviar:", formData);

    try {
      // Si estamos editando
      if (propietarioEditando) {
        const response = await fetch(
          `http://localhost:3000/api/duenos/${
            propietarioEditando._id || propietarioEditando.id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Propietario actualizado:", data);
          await fetchPropietarios();
          alert("✅ Propietario actualizado exitosamente!");
          handleCloseModal();
        } else {
          const errorData = await response.json();
          console.error("❌ Error:", errorData);
          alert(`❌ Error: ${errorData.message || "No se pudo actualizar"}`);
        }
      }
      // Si estamos creando uno nuevo
      else {
        const response = await fetch("http://localhost:3000/api/duenos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Propietario creado:", data);
          await fetchPropietarios();
          alert("✅ Propietario guardado exitosamente!");
          handleCloseModal();
        } else {
          const errorData = await response.json();
          console.error("❌ Error:", errorData);
          alert(`❌ Error: ${errorData.message || "No se pudo guardar"}`);
        }
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Error de conexión");
    }
  };

  const handleDelete = async (id) => {
    console.log("🗑️ Eliminando ID:", id);

    if (!id) {
      alert("❌ Error: ID no válido");
      return;
    }

    if (window.confirm("¿Estás seguro de eliminar este propietario?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/duenos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("✅ Eliminado");
          await fetchPropietarios();
          alert("✅ Propietario eliminado!");
        } else {
          const errorData = await response.json();
          console.error("❌ Error:", errorData);
          alert(`❌ Error: ${errorData.message || "No se pudo eliminar"}`);
        }
      } catch (error) {
        console.error("❌ Error:", error);
        alert("❌ Error de conexión");
      }
    }
  };

  const handleEdit = (propietario) => {
    setPropietarioEditando(propietario);
    setIsModalOpen(true);
  };

  const handleVerMascotas = (id) => {
    navigate(`/usuario/${id}`);
  };

  // Filtrar propietarios según búsqueda
  const propietariosFiltrados = propietarios.filter((propietario) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      propietario.nombreDueno?.toLowerCase().includes(searchLower) ||
      propietario.apellidoDueno?.toLowerCase().includes(searchLower) ||
      propietario.dni?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Botón volver */}
        <Link to="/">
          <button className="mb-6 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver
          </button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🐾 Propietarios
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona la información de los propietarios
          </p>
        </div>

        {/* Barra de búsqueda y botón agregar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          {/* Input de búsqueda */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleOpenModal}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            <span className="text-lg mr-2">+</span>
            Agregar Propietario
          </button>
        </div>

        {/* Lista de propietarios */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <svg
                className="animate-spin h-12 w-12 mb-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-lg font-medium">Cargando propietarios...</p>
            </div>
          ) : propietariosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <svg
                className="w-20 h-20 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg font-medium">
                {searchTerm
                  ? "No se encontraron resultados"
                  : "No hay propietarios registrados"}
              </p>
              <p className="text-sm mt-2">
                {searchTerm
                  ? "Intenta con otro término de búsqueda"
                  : 'Haz clic en "Agregar Propietario" para comenzar'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {propietariosFiltrados.map((propietario) => {
                const uniqueId = propietario._id || propietario.id;

                return (
                  <div
                    key={uniqueId}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Información del propietario */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                          {(propietario.nombreDueno?.[0] || "U").toUpperCase()}
                          {(
                            propietario.apellidoDueno?.[0] || "U"
                          ).toUpperCase()}
                        </div>

                        {/* Nombre y DNI */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {propietario.nombreDueno}{" "}
                            {propietario.apellidoDueno}
                          </h3>
                          {propietario.dni && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              DNI: {propietario.dni}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Botón ver mascotas */}
                        <button
                          onClick={() => handleVerMascotas(uniqueId)}
                          className="p-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                          title="Ver mascotas"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M18 4l-.84 2.21c-.29.77-.89 1.37-1.66 1.66L13.29 8.93c-.31.12-.51.41-.51.74v.01c0 .33.2.62.51.74l2.21.84c.77.29 1.37.89 1.66 1.66l.84 2.21c.12.31.41.51.74.51h.01c.33 0 .62-.2.74-.51l.84-2.21c.29-.77.89-1.37 1.66-1.66l2.21-.84c.31-.12.51-.41.51-.74v-.01c0-.33-.2-.62-.51-.74l-2.21-.84c-.77-.29-1.37-.89-1.66-1.66L18.74 4.51c-.12-.31-.41-.51-.74-.51h-.01c-.33 0-.62.2-.74.51zM6 16l-.84 2.21c-.29.77-.89 1.37-1.66 1.66L1.29 20.93c-.31.12-.51.41-.51.74v.01c0 .33.2.62.51.74l2.21.84c.77.29 1.37.89 1.66 1.66l.84 2.21c.12.31.41.51.74.51h.01c.33 0 .62-.2.74-.51l.84-2.21c.29-.77.89-1.37 1.66-1.66l2.21-.84c.31-.12.51-.41.51-.74v-.01c0-.33-.2-.62-.51-.74l-2.21-.84c-.77-.29-1.37-.89-1.66-1.66L6.74 16.51c-.12-.31-.41-.51-.74-.51h-.01c-.33 0-.62.2-.74.51zM9.5 3C7 3 5 5 5 7.5S7 12 9.5 12 14 10 14 7.5 12 3 9.5 3zm0 7C8.12 10 7 8.88 7 7.5S8.12 5 9.5 5 12 6.12 12 7.5 10.88 10 9.5 10z" />
                          </svg>
                        </button>

                        {/* Botón editar */}
                        <button
                          onClick={() => handleEdit(propietario)}
                          className="p-2 text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
                          title="Editar"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        {/* Botón eliminar */}
                        <button
                          onClick={() => handleDelete(uniqueId)}
                          className="p-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                          title="Eliminar"
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormPaciente
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          propietario={propietarioEditando}
        />
      </Modal>
    </div>
  );
}

export default HistorialClinica;
