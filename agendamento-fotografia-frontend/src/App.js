import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [ensaios, setEnsaios] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [ensaioSelecionado, setEnsaioSelecionado] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [campanha, setCampanha] = useState({ titulo: "", mensagem: "" });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", null, {
        params: { email, senha },
      });
      setMensagem(res.data);
      if (res.data.includes("sucesso")) {
        setToken("token-simulado");
        carregarEnsaios();
        carregarAgendamentos();
      }
    } catch (err) {
      setMensagem("Erro no login.");
    }
  };

  const carregarEnsaios = async () => {
    const res = await axios.get("http://localhost:8080/api/ensaios", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEnsaios(res.data);
  };

  const carregarAgendamentos = async () => {
    const res = await axios.get("http://localhost:8080/api/agendamentos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAgenda(res.data);
  };

  const agendar = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/agendamentos",
        {
          usuario: { id: 1 },
          ensaio: { id: ensaioSelecionado },
          dataHora,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensagem("Agendamento realizado com sucesso!");
      carregarAgendamentos();
    } catch (err) {
      setMensagem("Erro ao agendar.");
    }
  };

  const enviarCampanha = async () => {
    try {
      await axios.post("http://localhost:8080/api/campanhas/enviar", campanha, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("Campanha enviada com sucesso!");
    } catch (err) {
      setMensagem("Erro ao enviar campanha.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>

      {token && (
        <>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Novo Agendamento</h2>
            <select
              value={ensaioSelecionado}
              onChange={(e) => setEnsaioSelecionado(e.target.value)}
              className="border p-2 w-full mb-2"
            >
              <option value="">Selecione o tipo de ensaio</option>
              {ensaios.map((e) => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>
            <input
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={agendar}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirmar Agendamento
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Meus Agendamentos</h2>
            <ul className="space-y-2">
              {agenda.map((a) => (
                <li key={a.id} className="border p-2 rounded">
                  {a.ensaio?.nome || "Ensaio"} - {a.dataHora} - Status: {a.status}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Enviar Campanha</h2>
            <input
              type="text"
              placeholder="Título"
              value={campanha.titulo}
              onChange={(e) => setCampanha({ ...campanha, titulo: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Mensagem"
              value={campanha.mensagem}
              onChange={(e) => setCampanha({ ...campanha, mensagem: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={enviarCampanha}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Enviar Campanha
            </button>
          </div>
        </>
      )}

      {mensagem && <p className="mt-4 text-red-600">{mensagem}</p>}
    </div>
  );
}
