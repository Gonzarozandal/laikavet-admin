import { useState } from "react";

// Estado inicial para limpiar el formulario fácilmente
const estadoInicial = {
    Nombre: "",
    Especie: "Perro",
    Raza: "",
    Tamaño: "Mediano",
    Pelaje: "",
    Sexo: "Macho",
    Esterilizado: "No",
    FN: "",
    Motivo: ""
};

// El componente recibe la función para agregar la mascota y el tutor activo
function FormularioMascota({ onAgregarMascota, tutor }) {
    
    const [datos, setDatos] = useState(estadoInicial);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAgregarMascota(datos);
        setDatos(estadoInicial);
    };

    // 1. Lógica clave: el formulario estará deshabilitado si NO hay un tutor.
    const isDisabled = tutor;

    return (
        <div className="FormularioMascota">
            {/* 2. Mensaje de ayuda que solo aparece si el formulario está deshabilitado */}
            {isDisabled && (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                    Debes seleccionar un tutor para poder agregar una mascota.
                </p>
            )}
            
            <form onSubmit={handleSubmit}>
                {/* 3. El atributo 'disabled' se aplica a todos los campos y al botón */}
                <input type="text" name="Nombre" placeholder="Nombre de la mascota" value={datos.Nombre} onChange={handleInputChange} required disabled={isDisabled} />
                
                <select name="Especie" value={datos.Especie} onChange={handleInputChange} disabled={isDisabled}>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Otro">Otro</option>
                </select>

                <input type="text" name="Raza" placeholder="Raza" value={datos.Raza} onChange={handleInputChange} required disabled={isDisabled} />
                
                <select name="Tamaño" value={datos.Tamaño} onChange={handleInputChange} disabled={isDisabled}>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                </select>

                <input type="text" name="Pelaje" placeholder="Color del pelaje" value={datos.Pelaje} onChange={handleInputChange} disabled={isDisabled} />
                
                <div style={{ margin: '10px 0' }}>
                    <label>Sexo:</label>
                    <label><input type="radio" name="Sexo" value="Macho" checked={datos.Sexo === 'Macho'} onChange={handleInputChange} disabled={isDisabled} /> Macho</label>
                    <label><input type="radio" name="Sexo" value="Hembra" checked={datos.Sexo === 'Hembra'} onChange={handleInputChange} disabled={isDisabled} /> Hembra</label>
                </div>

                <div style={{ margin: '10px 0' }}>
                    <label>Esterilizado:</label>
                    <label><input type="radio" name="Esterilizado" value="Sí" checked={datos.Esterilizado === 'Sí'} onChange={handleInputChange} disabled={isDisabled} /> Sí</label>
                    <label><input type="radio" name="Esterilizado" value="No" checked={datos.Esterilizado === 'No'} onChange={handleInputChange} disabled={isDisabled} /> No</label>
                </div>

                <label>Fecha de Nacimiento (FN):</label>
                <input type="date" name="FN" value={datos.FN} onChange={handleInputChange} disabled={isDisabled} />

                <textarea name="Motivo" placeholder="Motivo de la consulta" value={datos.Motivo} onChange={handleInputChange} required disabled={isDisabled} />
                
                <button type="submit" disabled={isDisabled}>Agregar Mascota</button>
            </form>
        </div>
    );
};

export default FormularioMascota;