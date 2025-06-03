import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/usuario/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsuario(res.data))
      .catch((err) => {
        console.error("Erro ao carregar usuário:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 rounded">
        <h1 className="text-2xl font-bold text-indigo-600">📸 Agendamento Fotográfico</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </header>

      <main className="mt-8 bg-white p-6 rounded shadow max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Bem-vindo(a)!</h2>
        {usuario ? (
          <p>
            Você está logado como <strong>{usuario.nome}</strong> ({usuario.email})
          </p>
        ) : (
          <p>Carregando usuário...</p>
        )}
      </main>
    </div>
  );
}
