import { useEffect, useState } from "react";
import axios from "axios";

export default function AgendamentoForm({ agendamento, onClose }) {
  const [cliente, setCliente] = useState(agendamento?.cliente || localStorage.getItem("nome"));
  const [data, setData] = useState(agendamento ? agendamento.dataHora.split("T")[0] : "");
  const [hora, setHora] = useState(agendamento ? agendamento.dataHora.split("T")[1] : "");
  const [ensaioId, setEnsaioId] = useState(agendamento?.ensaio?.id || "");
  const [ensaios, setEnsaios] = useState([]);

  const carregarEnsaios = async () => {
    const resposta = await axios.get(`${import.meta.env.VITE_API_URL}/ensaios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setEnsaios(resposta.data);
  };

  const salvar = async () => {
    const dataHora = `${data}T${hora}`;
    const dados = { cliente, dataHora, ensaio: { id: ensaioId } };

    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    if (agendamento) {
      await axios.put(`${import.meta.env.VITE_API_URL}/agendamentos/${agendamento.id}`, dados, { headers });
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/agendamentos`, dados, { headers });
    }

    onClose();
  };

  useEffect(() => {
    carregarEnsaios();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto mt-6 border border-rose-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {agendamento ? "Editar Agendamento" : "Novo Agendamento"}
      </h3>

      <input
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      <select
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
        value={ensaioId}
        onChange={(e) => setEnsaioId(e.target.value)}
      >
        <option value="">Selecione um ensaio</option>
        {ensaios.map((e) => (
          <option key={e.id} value={e.id}>{e.titulo}</option>
        ))}
      </select>

      <input
        type="date"
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <input
        type="time"
        className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-rose-400"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />

      <div className="flex justify-end gap-4">
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
