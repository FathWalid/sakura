import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔒 Si pas de token → redirection
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  // Affiche la page uniquement si connecté
  if (!token) return null;

  return children;
}
