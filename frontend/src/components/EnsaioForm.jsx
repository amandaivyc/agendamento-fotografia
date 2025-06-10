import { useState } from "react";
import axios from "axios";

export default function EnsaioForm({ ensaio, onClose }) {
  const [titulo, setTitulo] = useState(ensaio?.titulo || "");
  const [descricao, setDescricao] = useState(ensaio?.descricao || "");

  const salvar = async () => {
    const dados = { titulo, descricao };
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    if (ensaio) {
      await axios.put(`${import.meta.env.VITE_API_URL}/ensaios/${ensaio.id}`, dados, { headers });
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/ensaios`, dados, { headers });
    }

    onClose();
  };

  return (
    <div className="bg-white border border-rose-100 p-6 rounded-2xl shadow-lg mt-6 w-full max-w-xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {ensaio ? "Editar Ensaio" : "Novo Ensaio"}
      </h3>

      <input
        className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        className="border border-gray-300 rounded-lg p-2 w-full mb-6 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <div className="flex justify-end gap-3">
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
