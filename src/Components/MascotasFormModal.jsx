import { useState, useEffect } from "react";

function MascotasFormModal({ onSubmit, onCancel, mascota, tutores = [] }) {
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    edad: "",
    tutor: "",
  });

  // Cargar datos cuando estamos editando
  useEffect(() => {//useEffect es un hook que se ejecuta cuando el componente se monta, en este caso cuando se carga la pagina
    if (mascota) {
      setFormData({
        nombre: mascota.nombre || "",
        especie: mascota.especie || "",
        edad: mascota.edad || "",
        tutor: mascota.tutor?._id || mascota.tutor || "",
      });
    }
  }, [mascota]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return;
    if (!formData.tutor) {
      alert("Debes seleccionar un tutor");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {mascota ? "Editar Mascota" : "Nueva Mascota"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {mascota
            ? "Modifica la información de la mascota"
            : "Completa la información de la mascota"}
        </p>
      </div>

      {/* Form Body */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {/* Nombre */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Max"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Especie */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Especie *
          </label>
          <input
            type="text"
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            placeholder="Ej: Perro"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Edad */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Edad
          </label>
          <input
            type="text"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Ej: 3 años"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        {/* Tutor */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tutor (Dueño) *
          </label>
          <select
            name="tutor"
            value={formData.tutor}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="">Selecciona un tutor</option>
            {tutores.map((t) => (
              <option key={t._id || t.id} value={t._id || t.id}>
                {t.nombre} {t.apellido} - {t.dni}
              </option>
            ))}
          </select>
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
          {mascota ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}

export default MascotasFormModal;
