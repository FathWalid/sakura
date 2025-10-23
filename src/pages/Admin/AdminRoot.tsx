import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

export function AdminRoot() {
  const { token } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // ✅ Si connecté → redirection vers dashboard
      navigate("/admin/dashboard", { replace: true });
    } else {
      // 🚪 Si non connecté → redirection vers login
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  return null; // Rien à afficher
}
