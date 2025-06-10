import { useEffect, useState } from "react";
import axios from "axios";
import AgendamentoForm from "../components/AgendamentoForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [agendamentoParaExcluir, setAgendamentoParaExcluir] = useState(null);

  const carregar = async () => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("perfil");
    const headers = { Authorization: `Bearer ${token}` };

    let resposta;
    if (perfil === "ADMIN") {
      resposta = await axios.get(`${import.meta.env.VITE_API_URL}/agendamentos`, { headers });
    } else {
      resposta = await axios.get(`${import.meta.env.VITE_API_URL}/agendamentos/minhas`, { headers });
    }

    setAgendamentos(resposta.data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const confirmarExclusao = (agendamento) => {
    setAgendamentoParaExcluir(agendamento);
    setMostrarConfirmacao(true);
  };

  const excluir = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    await axios.delete(`${import.meta.env.VITE_API_URL}/agendamentos/${agendamentoParaExcluir.id}`, { headers });
    setMostrarConfirmacao(false);
    carregar();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">📅 Agendamentos</h2>

      <div className="flex justify-center mb-4">
        <button
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          onClick={() => {
            setAgendamentoSelecionado(null);
            setMostrarFormulario(true);
          }}
        >
          Novo Agendamento
        </button>
      </div>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Cliente</th>
            <th className="p-2">Data e Hora</th>
            <th className="p-2">Ensaio</th>
            <th className="p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.cliente}</td>
              <td className="p-2">{new Date(a.dataHora).toLocaleString("pt-BR")}</td>
              <td className="p-2">{a.ensaio?.titulo}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setAgendamentoSelecionado(a);
                    setMostrarFormulario(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => confirmarExclusao(a)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarFormulario && (
        <AgendamentoForm
          agendamento={agendamentoSelecionado}
          onClose={() => {
            setMostrarFormulario(false);
            carregar();
          }}
        />
      )}

      {mostrarConfirmacao && (
        <ConfirmDialog
          mensagem={`Deseja realmente excluir o agendamento de "${agendamentoParaExcluir.cliente}"?`}
          onConfirm={excluir}
          onCancel={() => setMostrarConfirmacao(false)}
        />
      )}
    </div>
  );
}
