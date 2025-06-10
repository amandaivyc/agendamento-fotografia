import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/Home";
import UsuariosPage from "../pages/UsuariosPage";
import EnsaiosPage from "../pages/EnsaiosPage";
import CampanhasPage from "../pages/CampanhasPage";
import EnviarEmailPage from "../pages/EnviarEmailPage";
import AgendamentosPage from "../pages/AgendamentosPage";
import RotaAdmin from "./RotaAdmin";

// Componente de proteção de rotas
function RotaPrivada({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <RotaPrivada>
              <HomePage />
            </RotaPrivada>
          }
        />
        
        <Route
          path="/usuarios"
          element={
            <RotaPrivada>
              <UsuariosPage />
            </RotaPrivada>
          }
        />

        <Route
          path="/ensaios"
          element={
            <RotaPrivada>
              <EnsaiosPage />
            </RotaPrivada>
          }
        />

        <Route
          path="/campanhas"
          element={
            <RotaPrivada>
              <CampanhasPage />
            </RotaPrivada>
          }
        />

        <Route path="/agendamentos" element={<AgendamentosPage />} />

         <Route
    path="/enviar-email"
    element={
      <RotaAdmin>
        <EnviarEmailPage />
      </RotaAdmin>
    }
  />
        {/* fallback para rotas desconhecidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
