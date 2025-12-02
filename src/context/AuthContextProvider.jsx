import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((u) => u.email === email)) {
        throw new Error("El email ya está registrado");
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      return {
        success: true,
        message: "Registro exitoso. Ahora puedes iniciar sesión.",
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Email o contraseña incorrectos");
      }

      const userWithoutPassword = { id: foundUser.id, email: foundUser.email };
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({ user, isLoading, register, login, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
