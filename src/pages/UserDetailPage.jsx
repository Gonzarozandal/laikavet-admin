import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import UserDetail from "../Components/UserDetail";
import UserMascotas from "../Components/UserMascotas";

function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      // Obtener datos del usuario
      const userResponse = await fetch(
        `http://localhost:3000/api/duenos/${userId}`
      );
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUsuario(userData);
      }

      // Obtener mascotas del usuario (si existe endpoint)
      try {
        const mascotasResponse = await fetch(
          `http://localhost:3000/api/mascotas?dueno=${userId}`
        );
        if (mascotasResponse.ok) {
          const mascotasData = await mascotasResponse.json();
          setMascotas(mascotasData);
        }
      } catch (error) {
        console.warn("No se pudo cargar mascotas:", error);
        // Si no existe endpoint de mascotas, obtenerlas de localStorage
        const stored = localStorage.getItem("mascotas");
        if (stored) {
          const allMascotas = JSON.parse(stored);
          // Filtrar por usuario si está disponible
          setMascotas(allMascotas);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar los datos del usuario");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleVolver = () => {
    navigate("/historial-clinico");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
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
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-white mb-4">Usuario no encontrado</p>
          <button
            onClick={handleVolver}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Botón volver */}
        <button
          onClick={handleVolver}
          className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al Historial
        </button>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Datos del usuario */}
          <div className="lg:col-span-1">
            <UserDetail usuario={usuario} />
          </div>

          {/* Mascotas del usuario */}
          <div className="lg:col-span-2">
            <UserMascotas
              mascotas={mascotas}
              usuarioId={userId}
              onMascotasChange={fetchUserData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
