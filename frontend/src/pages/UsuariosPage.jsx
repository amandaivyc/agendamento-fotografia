import { useEffect, useState } from "react";
import axios from "axios";
import UsuarioForm from "../components/UsuarioForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(null);

  const carregarUsuarios = async () => {
    const resposta = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setUsuarios(resposta.data);
  };

  const excluirUsuario = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setConfirmarExclusao(null);
    carregarUsuarios();
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      <h2 className="text-3xl font-semibold text-amber-700 mb-6 text-center">Usuários</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setUsuarioSelecionado(null);
            setMostrarForm(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow"
        >
          Novo Usuário
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-rose-100 text-amber-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Perfil</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.nome}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.perfil}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setUsuarioSelecionado(u);
                      setMostrarForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setConfirmarExclusao(u)}
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
        <UsuarioForm
          usuario={usuarioSelecionado}
          onClose={() => {
            setMostrarForm(false);
            carregarUsuarios();
          }}
        />
      )}

      {confirmarExclusao && (
        <ConfirmDialog
          mensagem={`Deseja excluir ${confirmarExclusao.nome}?`}
          onConfirm={() => excluirUsuario(confirmarExclusao.id)}
          onCancel={() => setConfirmarExclusao(null)}
        />
      )}
    </div>
  );
}
