import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        senha,
      });

      const { token, nome, perfil } = resposta.data;

      localStorage.setItem("token", token);
      localStorage.setItem("nome", nome);
      localStorage.setItem("perfil", perfil);

      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-amber-700 mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-rose-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-rose-700 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
