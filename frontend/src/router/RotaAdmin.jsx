import { Navigate } from "react-router-dom";

export default function RotaAdmin({ children }) {
  const perfil = localStorage.getItem("perfil");

  if (perfil !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
}
