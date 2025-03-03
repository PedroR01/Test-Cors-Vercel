import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextFunct';
import serverUrl from '../utils/serverUrl';
export default function Footer() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await fetch(`${serverUrl.produccion}/logout`, {
        method: 'POST',
        credentials: "include", // Esto asegura que las cookies se envíen
      });
      if (!response.ok)
        throw new Error('Error al cerrar sesión');
      setIsAuthenticated(false);
      navigate("/");
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleAdminClick = () => {
    navigate('/login'); // Redirige a la página de registro
  };
  return (

    <footer className="bg-[#FEFFEB] py-4 text-last z-20 mt-auto flex justify-center items-center ontainer mx-auto  flex-wrap  text-center md:text-left">
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <p className='text-[#2B1F12]' >Realizado por <span className="font-bold">Voltio⚡</span></p>
      </div>
      <div className="w-full md:w-1/3 mb-4 md:mb-0 disabled">
        {!isAuthenticated ? (
          <button className="font-bold opacity-65" onClick={handleAdminClick}>Administrador</button>
        )
          : (
            <button className="font-bold opacity-65" onClick={logOut}>Cerrar sesión</button>)
        }
      </div>
      <div className="w-full md:w-1/3">
        <p className='text-[#2B1F12]'>Contáctanos <span className="font-bold">grupovoltio@gmail.com</span></p>
      </div>
      <p className="text-[#2B1F12] mt-6">&copy;2025 El Club del Filete. Todos los derechos reservados.</p>
    </footer>
  );
}
