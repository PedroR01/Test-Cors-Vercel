import { useState, useEffect } from "react";
import Button from "../../components/Button";

export default function SignUpPage() {
    const defaultState = {
        username: "",
        email: "",
        password: "",
    };

    const [credentials, setCredentials] = useState({});
    const [canSend, setCanSend] = useState(false);

    useEffect(() => {
        if (canSend) {
            setCanSend(false);
            sendData(credentials);
        }
    }, [canSend])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const sendData = async ({ username, email, password }) => {
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCanSend(true);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen dark gap-12 mt-24">
            <section className="w-full max-w-md bg-gradient-to-b from-[#8F272A] to-[#2F0C0D] rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#FEFFEB] inria-sans-regular mb-4">Registro</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input className="bg-[#2F0C0D] inria-sans-regular text-gray-200 border-0 rounded-md p-2 mb-4 focus:brightness-90 focus:outline-none focus:ring-1 focus:ring-[#CDA053] transition ease-in-out duration-150"
                        placeholder="Nombre de usuario"
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange} />
                    <input className="bg-[#2F0C0D] inria-sans-regular text-gray-200 border-0 rounded-md p-2 mb-4 focus:brightness-90 focus:outline-none focus:ring-1 focus:ring-[#CDA053] transition ease-in-out duration-150"
                        placeholder="Dirección Email"
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange} />
                    <input className="bg-[#2F0C0D] inria-sans-regular text-gray-200 border-0 rounded-md p-2 mb-4 focus:brightness-90 focus:outline-none focus:ring-1 focus:ring-[#CDA053] transition ease-in-out duration-150"
                        placeholder="Contraseña"
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange} />
                    <Button text={"Registrarse"} btnType={"submit"} />
                </form>
            </section>
            <section className="w-full max-w-md bg-gradient-to-b from-[#8F272A] to-[#2F0C0D] rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#FEFFEB] inria-sans-regular mb-4">Inicio Sesión</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input className="bg-[#2F0C0D] inria-sans-regular text-gray-200 border-0 rounded-md p-2 mb-4 focus:brightness-90 focus:outline-none focus:ring-1 focus:ring-[#CDA053] transition ease-in-out duration-150"
                        placeholder="Dirección Email"
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange} />
                    <input className="bg-[#2F0C0D] inria-sans-regular text-gray-200 border-0 rounded-md p-2 mb-4 focus:brightness-90 focus:outline-none focus:ring-1 focus:ring-[#CDA053] transition ease-in-out duration-150"
                        placeholder="Contraseña"
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange} />
                    <Button text={"Iniciar sesión"} btnType={"submit"} />
                </form>
            </section>
        </div>
    );
}