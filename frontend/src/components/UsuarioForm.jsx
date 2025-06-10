import { useState } from "react";
import axios from "axios";

export default function UsuarioForm({ usuario, onClose }) {
  const [nome, setNome] = useState(usuario?.nome || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState(usuario?.perfil || "USUARIO");

  const salvar = async () => {
    const dados = { nome, email, senha, perfil };
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    if (usuario) {
      await axios.put(`${import.meta.env.VITE_API_URL}/usuarios/${usuario.id}`, dados, { headers });
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, dados, { headers });
    }

    onClose();
  };

  return (
    <div className="bg-white border border-rose-100 p-6 rounded-2xl shadow-md mt-6 w-full max-w-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {usuario ? "Editar Usuário" : "Novo Usuário"}
      </h3>
      <input
        className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <select
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
        value={perfil}
        onChange={e => setPerfil(e.target.value)}
      >
        <option value="USUARIO">USUÁRIO</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <div className="flex gap-4 justify-end">
        <button
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-lg transition"
          onClick={salvar}
        >
          Salvar
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
