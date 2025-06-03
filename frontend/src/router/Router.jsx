// Estrutura base do layout com menu lateral e rotas para Usuários, Ensaios e Campanhas
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-indigo-700 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold">📸 Painel</h1>
        <nav className="flex flex-col gap-2">
          <Link to="/home" className="hover:underline">Início</Link>
          <Link to="/usuarios" className="hover:underline">Usuários</Link>
          <Link to="/ensaios" className="hover:underline">Ensaios</Link>
          <Link to="/campanhas" className="hover:underline">Campanhas</Link>
        </nav>
        <button onClick={logout} className="mt-8 bg-red-500 px-4 py-2 rounded">Sair</button>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <AppRoutes />
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Inicio />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/ensaios" element={<Ensaios />} />
      <Route path="/campanhas" element={<Campanhas />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

function Inicio() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/usuario/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUsuario(res.data))
      .catch(() => setUsuario(null));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Bem-vindo(a)!</h2>
      {usuario ? (
        <p>Logado como <strong>{usuario.nome}</strong> ({usuario.email})</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

function Usuarios() {
  return <h2 className="text-xl font-semibold">Gerenciar Usuários</h2>;
}

function Ensaios() {
  return <h2 className="text-xl font-semibold">Agenda de Ensaios</h2>;
}

function Campanhas() {
  return <h2 className="text-xl font-semibold">Campanhas Ativas</h2>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        senha,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Falha no login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" placeholder="E-mail" className="border p-2 w-full" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" className="border p-2 w-full" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}

function AuthenticatedApp() {
  const token = localStorage.getItem("token");
  return token ? <Menu /> : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AuthenticatedApp />} />
      </Routes>
    </Router>
  );
}
