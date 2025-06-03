import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/usuario/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error("Erro ao carregar usuário:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Bem-vindo(a)!</h1>
      {usuario ? (
        <p>Você está logado como <strong>{usuario.nome}</strong> ({usuario.email})</p>
      ) : (
        <p>Carregando usuário...</p>
      )}
    </div>
  );
}
