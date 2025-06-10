import { useState } from "react";
import axios from "axios";

export default function EnviarEmailForm({ campanha }) {
  const [destinatarios, setDestinatarios] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState(null);

  const enviarEmail = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const dados = { destinatarios: destinatarios.split(","), mensagem };
      await axios.post(`${import.meta.env.VITE_API_URL}/campanhas/${campanha.id}/enviar-email`, dados, { headers });
      setStatus("E-mail enviado com sucesso!");
    } catch (error) {
      setStatus("Erro ao enviar o e-mail. Verifique os dados e tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto mt-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Enviar Campanha por E-mail</h2>

      <p className="mb-4 text-sm text-gray-600">
        <strong>Título da Campanha:</strong> {campanha.titulo}
      </p>
      <p className="mb-4 text-sm text-gray-600">
        <strong>Descrição:</strong> {campanha.descricao}
      </p>

      <textarea
        className="w-full p-2 border mb-4 rounded"
        rows={4}
        placeholder="Digite os e-mails dos destinatários separados por vírgula"
        value={destinatarios}
        onChange={(e) => setDestinatarios(e.target.value)}
      />

      <textarea
        className="w-full p-2 border mb-4 rounded"
        rows={6}
        placeholder="Escreva a mensagem da campanha"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />

      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        onClick={enviarEmail}
      >
        Enviar E-mail
      </button>

      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
