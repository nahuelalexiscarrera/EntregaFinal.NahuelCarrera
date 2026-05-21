import { useState, useCallback } from "react";

const STORAGE_KEY = "userDB";
const SESSION_KEY = "sesionActiva";

export function useAuth() {
  const getSession = () => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  };

  const [session, setSession] = useState(getSession);

  const register = useCallback(({ nombre, email, pass }) => {
    const usuario = { nombre, email, pass };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
    setSession(usuario);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, pass }) => {
    try {
      const userDB = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (userDB && userDB.email === email && userDB.pass === pass) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(userDB));
        setSession(userDB);
        return { ok: true };
      }
      return { ok: false, message: "Datos incorrectos o usuario no registrado." };
    } catch {
      return { ok: false, message: "Error al iniciar sesion." };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  const getSavedEmail = () => {
    try {
      const userDB = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return userDB?.email || "";
    } catch {
      return "";
    }
  };

  return { session, login, register, logout, getSavedEmail };
}
