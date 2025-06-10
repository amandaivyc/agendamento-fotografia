import { useState } from "react";
import axios from "axios";

export default function EnviarEmailForm({ campanhaId, onClose }) {
  const [destinatarios, setDestinatarios] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarEmail = async () => {
    try {
      const payload = {
        destinatarios: destinatarios.split(",").map((email) => email.trim()),
        mensagem,
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/campanhas/${campanhaId}/enviar-email`,
        payload,
        { headers }
      );

      setEnviado(true);
      setMensagem("");
      setDestinatarios("");
    } catch (err) {
      alert("Erro ao enviar e-mails.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        Enviar E-mail da Campanha
      </h2>

      {enviado && (
        <div className="bg-green-100 text-green-800 px-4 py-2 mb-4 rounded">
          E-mails enviados com sucesso!
        </div>
      )}

      <textarea
        className="w-full p-2 mb-3 border rounded"
        placeholder="Digite os e-mails separados por vírgula"
        value={destinatarios}
        onChange={(e) => setDestinatarios(e.target.value)}
      />

      <textarea
        className="w-full p-2 mb-4 border rounded"
        placeholder="Mensagem da campanha"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />

      <div className="flex justify-center gap-4">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={enviarEmail}
        >
          Enviar
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
