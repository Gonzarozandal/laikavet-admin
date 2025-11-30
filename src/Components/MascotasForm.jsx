function MascotasForm({ form, onchange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
    >
      <input
        name="nombre"
        value={form.nombre}
        onChange={onchange}
        placeholder="Nombre"
        className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
      />
      <input
        name="especie"
        value={form.especie}
        onChange={onchange}
        placeholder="Especie"
        className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
      />
      <div className="flex gap-2">
        <input
          name="edad"
          value={form.edad}
          onChange={onchange}
          placeholder="Edad"
          className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white flex-1"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
    </form>
  );
}

export default MascotasForm;
