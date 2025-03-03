import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContextFunct';
import serverUrl from '../components/utils/serverUrl';
import Button from '../components/Button';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!username || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    sendData({ username, password });
  };


  const sendData = async ({ username, password }) => {
    try {
      const response = await fetch(`${serverUrl.produccion}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();  // Lee la respuesta JSON de error
        setIsAuthenticated(false);
        throw new Error(errorData.message || 'Error al enviar el formulario');  // Usa el mensaje de error que se pasó
      }
      setIsAuthenticated(true);
      navigate('/');
    } catch (e) {
      setIsAuthenticated(false);
      setError(e.message);
    }
  };

  return (
    <div className="bg-[#24222B] min-h-screen font-sans pt-28">
      <div className="max-w-md bg-gradient-to-t from-[#24222B] to-[#19171e] rounded-3xl p-8 pt-20 border-4 border-[#24222B] shadow-blog-main m-5 mx-auto">
        <h1 className="text-left text-[#FEFFFB]">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="mt-5 mx-auto">
          <input required className="w-full bg-[#FEFFFB] border-none p-4 rounded-2xl mt-4 shadow-blog-main border-transparent focus:outline-none focus:border-[#12B1D1]" type="email" name="email" id="email" onChange={(e) => setUsername(e.target.value)} placeholder="E-mail" />
          <input required className="w-full bg-[#FEFFFB] border-none p-4 rounded-2xl mt-4 shadow-blog-main border-transparent focus:outline-none focus:border-[#12B1D1]" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          {<p className="text-red-500 text-sm mt-4 mb-6">{error}</p>}

          <div className="mt-16">
            <Button text={"Iniciar sesión"} btnType={"submit"} state={false} />
          </div>
        </form>
      </div>
    </div>
  )
}