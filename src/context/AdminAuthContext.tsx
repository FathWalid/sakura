import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// ✅ 1. Définir une interface pour ton contexte
interface AdminAuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ 2. Créer le contexte avec un type par défaut
export const AdminAuthContext = createContext<AdminAuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {},
});

// ✅ 3. Typage des props du provider
interface AdminAuthProviderProps {
  children: ReactNode;
}

// ✅ 4. Le provider
export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("adminToken")
  );
  const navigate = useNavigate();

  // 🔐 Connexion admin
  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Identifiants invalides");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  // 🚪 Déconnexion admin
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    navigate("/admin/login", { replace: true });
    window.location.reload();
  };

  // 🔄 Restauration du token à l'ouverture
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) setToken(storedToken);
  }, []);

  // ✅ 5. Retour du provider
  return (
    <AdminAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
