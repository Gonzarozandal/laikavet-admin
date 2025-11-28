import { useState, useEffect } from 'react';

function FormPaciente({ onSubmit, onCancel, propietario }) {
  const [formData, setFormData] = useState({
    nombreDueno: '',
    apellidoDueno: '',
    telefono: '',
    email: '',
    direccion: '',
    dni: '',
    ciudad: ''
  });

  // Cargar datos cuando estamos editando
  useEffect(() => {
    if (propietario) {
      setFormData({
        nombreDueno: propietario.nombreDueno || '',
        apellidoDueno: propietario.apellidoDueno || '',
        telefono: propietario.telefono || '',
        email: propietario.email || '',
        direccion: propietario.direccion || '',
        dni: propietario.dni || '',
        ciudad: propietario.ciudad || ''
      });
    }
  }, [propietario]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {propietario ? 'Editar Propietario' : 'Nuevo Propietario'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {propietario ? 'Modifica la información del propietario' : 'Completa la información del propietario'}
        </p>
      </div>

      {/* Form Body */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Nombre y Apellido en dos columnas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre *
            </label>
            <input
              type="text"
              name="nombreDueno"
              value={formData.nombreDueno}
              onChange={handleChange}
              placeholder="Ej: Juan"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Apellido *
            </label>
            <input
              type="text"
              name="apellidoDueno"
              value={formData.apellidoDueno}
              onChange={handleChange}
              placeholder="Ej: Pérez"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>

        {/* DNI */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            DNI / Documento *
          </label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="Ej: 12345678"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej: 1234567890"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: correo@ejemplo.com"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Dirección *
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ej: Calle 123, Barrio Centro"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Ciudad */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ciudad *
          </label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            placeholder="Ej: Buenos Aires"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

      {/* Footer con botones */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {propietario ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
}

export default FormPaciente;