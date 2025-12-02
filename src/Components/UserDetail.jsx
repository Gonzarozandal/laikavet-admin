function UserDetail({ usuario }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
          {(usuario.nombreDueno?.[0] || "U").toUpperCase()}
          {(usuario.apellidoDueno?.[0] || "U").toUpperCase()}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-6">
        {usuario.nombreDueno} {usuario.apellidoDueno}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">DNI</label>
          <p className="text-white text-lg">{usuario.dni || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Teléfono
          </label>
          <p className="text-white text-lg">{usuario.telefono || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <p className="text-white text-lg break-all">
            {usuario.email || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Dirección
          </label>
          <p className="text-white text-lg">{usuario.direccion || "N/A"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Ciudad
          </label>
          <p className="text-white text-lg">{usuario.ciudad || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
