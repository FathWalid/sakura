import { useState, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AdminAuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password); // ✅ on passe les deux arguments
    } catch {
      setError("Erreur de connexion");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-100 to-pink-300 justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">🌸 Sakura Admin</h2>

        {error && (
          <p className="text-red-500 bg-red-100 py-2 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg transition-all"
          >
            Se connecter
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-sm">
          © Sakura Dashboard — Parfum et élégance 🌸
        </p>
      </div>
    </div>
  );
}
