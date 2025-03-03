import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextFunct'; // Asegúrate de importar el hook
import { useContext, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext); // Accedes al valor de isAuthenticated

  const navigate = useNavigate(); // Usamos el hook para navegación
  useEffect(() => {

    // Si no está autenticado, redirigimos a la raíz
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading || !isAuthenticated) {
    // Mientras se redirige, puedes mostrar un mensaje de carga o nada
    return (
      <LoadingScreen />)

  }
  return children;
}