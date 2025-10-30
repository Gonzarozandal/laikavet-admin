import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx';
import FormPaciente from './FormUsers';

function HistorialClinica() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://tu-backend-url/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) //
      });

      if (response.ok) {
        const data = await response.json();n
        console.log('Paciente guardado:', data);
        alert('✅ Paciente guardado exitosamente!');
        handleCloseModal();
      } else {
        alert('❌ Error al guardar el paciente');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Botón volver */}
        <Link to="/">
          <button className="mb-6 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🐾 Historial Clínico
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona la información de tus pacientes
          </p>
        </div>

        {/* Botón agregar */}
        <button 
          onClick={handleOpenModal}
          className="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-lg hover:shadow-xl transition-all"
        >
          <span className="text-lg mr-2">+</span>
          Agregar Propietario
        </button>

        {/* Área de contenido */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-96">
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">No hay propietarios registrados</p>
            <p className="text-sm mt-2">Haz clic en "Agregar Propietario" para comenzar</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormPaciente 
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default HistorialClinica;