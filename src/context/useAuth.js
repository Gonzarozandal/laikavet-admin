//es un hook que se encarga de manejar el estado de la autenticacion, sirve para que cualquier componente pueda acceder al estado de la autenticacion
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {//funcion que se encarga de manejar el estado de la autenticacion
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
