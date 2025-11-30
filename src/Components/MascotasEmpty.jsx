function MascotasEmpty() {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="min-h-[260px] flex flex-col items-center justify-center text-center text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2M7 9h10M7 13h10M7 5h10"
          />
        </svg>
        <div className="text-xl font-semibold mb-1">
          No hay mascotas registradas
        </div>
        <div className="text-sm text-gray-400">
          Haz clic en "Agregar Mascota" para comenzar
        </div>
      </div>
    </div>
  );
}

export default MascotasEmpty;
