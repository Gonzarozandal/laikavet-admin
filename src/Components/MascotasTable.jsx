function MascotasTable({ mascotas, query, onDelete }) {//funcion que se encarga de mostrar la tabla de mascotas
  const filtered = mascotas.filter((m) => {
    const q = query.toLowerCase();
    return (
      m.nombre.toLowerCase().includes(q) ||
      (m.especie || "").toLowerCase().includes(q) ||
      (m.edad || "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <ul>
        {filtered.length === 0 ? (
          <li className="text-gray-400">No hay mascotas que coincidan.</li>
        ) : (
          filtered.map((m) => (
            <li
              key={m.id}
              className="bg-slate-700 border border-slate-600 rounded p-4 mb-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-white">
                  {m.nombre}{" "}
                  <span className="text-sm text-gray-400">({m.especie})</span>
                </div>
                {m.tutor && (
                  <div className="text-sm text-blue-400">
                    Dueño: {m.tutor.nombre} {m.tutor.apellido}
                  </div>
                )}
                {m.edad && (
                  <div className="text-sm text-gray-400">Edad: {m.edad}</div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onDelete(m.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MascotasTable;
