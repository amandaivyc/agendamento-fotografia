import { useEffect, useState } from "react";
import axios from "axios";
import CampanhaForm from "../components/CampanhaForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EnviarEmailForm from "../components/EnviarEmailForm";

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState([]);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [mostrarFormularioEmail, setMostrarFormularioEmail] = useState(false);
  const [campanhaParaExcluir, setCampanhaParaExcluir] = useState(null);

  const carregar = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    const resposta = await axios.get(`${import.meta.env.VITE_API_URL}/campanhas`, { headers });
    setCampanhas(resposta.data);
  };

  const confirmarExclusao = (campanha) => {
    setCampanhaParaExcluir(campanha);
    setMostrarConfirmacao(true);
  };

  const excluir = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    await axios.delete(`${import.meta.env.VITE_API_URL}/campanhas/${campanhaParaExcluir.id}`, { headers });
    setMostrarConfirmacao(false);
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">📢 Campanhas</h2>

      <div className="flex justify-center mb-4 gap-4">
        <button
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          onClick={() => {
            setCampanhaSelecionada(null);
            setMostrarFormulario(true);
          }}
        >
          Nova Campanha
        </button>
      </div>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Título</th>
            <th className="p-2">Descrição</th>
            <th className="p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {campanhas.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.titulo}</td>
              <td className="p-2">{c.descricao}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setCampanhaSelecionada(c);
                    setMostrarFormulario(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => confirmarExclusao(c)}
                >
                  Excluir
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => {
                    setCampanhaSelecionada(c);
                    setMostrarFormularioEmail(true);
                  }}
                >
                  📩 Enviar e-mail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarFormulario && (
        <CampanhaForm
          campanha={campanhaSelecionada}
          onClose={() => {
            setMostrarFormulario(false);
            carregar();
          }}
        />
      )}

      {mostrarFormularioEmail && campanhaSelecionada && (
        <EnviarEmailForm
          campanha={campanhaSelecionada}
          onClose={() => {
            setMostrarFormularioEmail(false);
            setCampanhaSelecionada(null);
          }}
        />
      )}

      {mostrarConfirmacao && (
        <ConfirmDialog
          mensagem={`Deseja realmente excluir a campanha "${campanhaParaExcluir.titulo}"?`}
          onConfirm={excluir}
          onCancel={() => setMostrarConfirmacao(false)}
        />
      )}
    </div>
  );
}
