import { useNavigate, useLocation } from "react-router-dom";

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const link = (path: string, label: string, emoji?: string) => (
    <button
      key={path}
      onClick={() => navigate(path)}
      className={`block w-full text-left px-3 py-2 rounded transition flex items-center gap-2 ${
        location.pathname === path
          ? "bg-white text-pink-600 font-semibold"
          : "hover:bg-pink-700"
      }`}
    >
      <span>{emoji}</span> {label}
    </button>
  );

  return (
    <aside className="w-64 bg-pink-600 text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">🌸 Sakura Admin</h2>
        <nav className="space-y-2">
          {link("/admin/dashboard", "Tableau de bord", "📊")}
          {link("/admin/products", "Sakura Parfums", "🧴")}
          {link("/admin/zara", "Zara Parfums", "👔")}
          {link("/admin/rituals", "Rituals Parfums", "🪷")}
          {link("/admin/decants", "Décants Parfums", "💧")}

          {link("/admin/orders", "Commandes", "📦")}
          
          {/* 🖼️ Nouvelle section pour le panneau d’animation */}
          {link("/admin/banners", "Bannières / Animations", "🎞️")}
        </nav>
      </div>

      <button
        onClick={onLogout}
        className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold mt-8 hover:bg-gray-100 transition"
      >
        Déconnexion
      </button>
    </aside>
  );
}
