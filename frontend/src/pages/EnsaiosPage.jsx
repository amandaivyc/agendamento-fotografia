import { useEffect, useState } from "react";
import axios from "axios";
import EnsaioForm from "../components/EnsaioForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function EnsaiosPage() {
  const [ensaios, setEnsaios] = useState([]);
  const [ensaioSelecionado, setEnsaioSelecionado] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(null);

  const carregarEnsaios = async () => {
    const resposta = await axios.get(`${import.meta.env.VITE_API_URL}/ensaios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setEnsaios(resposta.data);
  };

  const excluirEnsaio = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/ensaios/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setConfirmarExclusao(null);
    carregarEnsaios();
  };

  useEffect(() => {
    carregarEnsaios();
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      <h2 className="text-3xl font-semibold text-amber-700 mb-6 text-center">Ensaios</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setEnsaioSelecionado(null);
            setMostrarForm(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow"
        >
          Novo Ensaio
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-rose-100 text-amber-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Valor</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ensaios.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.id}</td>
                <td className="p-3">{e.titulo}</td>
                <td className="p-3">{e.descricao}</td>
                <td className="p-3">R$ {e.valor.toFixed(2)}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEnsaioSelecionado(e);
                      setMostrarForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setConfirmarExclusao(e)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarForm && (
        <EnsaioForm
          ensaio={ensaioSelecionado}
          onClose={() => {
            setMostrarForm(false);
            carregarEnsaios();
          }}
        />
      )}

      {confirmarExclusao && (
        <ConfirmDialog
          mensagem={`Deseja excluir o ensaio "${confirmarExclusao.titulo}"?`}
          onConfirm={() => excluirEnsaio(confirmarExclusao.id)}
          onCancel={() => setConfirmarExclusao(null)}
        />
      )}
    </div>
  );
}
