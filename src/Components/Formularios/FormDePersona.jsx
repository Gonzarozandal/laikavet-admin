/*
import { useState } from "react";

import { Persona }  from "../Clases/Persona.jsx"; 


function FormDePersona({ onAgregarPersona }) {
    
    
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        gmail: "",
        dni: "", 
        direccion: ""
    });

   
    const handleInputChange = (e) => {
        setDatos({...datos, [e.target.name]: e.target.value });
    };

    // 4. Esta es la función que se ejecuta SOLO cuando se envía el formulario.
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        const nuevaPersona = new Persona(
                datos.nombre,
                datos.apellido,
                datos.gmail,     
                datos.dni,        
                datos.telefono,   
                datos.direccion
    );
        
        onAgregarPersona(nuevaPersona);

        setDatos({
        nombre: '', apellido: '', telefono: '', gmail: '', dni: '', direccion: ''
    });
    };

    
    return (
        <div className="FormularioConsulta">
            <form onSubmit={handleSubmit}>
                <input type="text"
                name="nombre" 
                placeholder="Nombre" 
                value={datos.nombre} 
                onChange={handleInputChange} 
                />

                <input type="text" 
                name="apellido" 
                placeholder="Apellido" 
                value={datos.apellido} 
                onChange={handleInputChange} 
                required/>

                <input type="tel" 
                name="telefono" 
                placeholder="Teléfono" 
                value={datos.telefono} 
                onChange={handleInputChange}
                required />

                <input type="email" 
                name="gmail" 
                placeholder="Gmail" 
                value={datos.gmail} 
                onChange={handleInputChange}
                pattern="^[a-zA-Z0-9._-]+@(gmail|hotmail|outlook)\.com$"
                required
                title="Por favor, ingresa una dirección de Gmail, Hotmail o Outlook válida."
                 />

                <input type="text" 
                name="dni" 
                placeholder="DNI" 
                value={datos.dni} 
                onChange={handleInputChange}
                required />

                <input type="text" 
                name="direccion" 
                placeholder="Dirección" 
                value={datos.direccion} 
                onChange={handleInputChange} 
                required/>
                
                <button type="submit">Agregar Consulta</button>
            </form>
        </div>
    );
};

export default FormDePersona; // Nombre unificado
 */