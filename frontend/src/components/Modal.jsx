import { useState, useEffect } from "react";
import Button from "./Button";
import SuccessMessage from "./SuccessMessage";

// Añadir popup avisando que el mail se envio correctamente en caso de cumplir con los requisitos, y al confirmar dicho aviso, se cierra automaticamente el modal (devuelve state = false)
// Error: Una vez que se introduce un valor válido en el campo, el boton se habilita y nunca se vuelve a deshabilitar
export default function Modal({ state }) {
  const defaultState = {
    nombre: "",
    email: "",
    descripcion: "",
  };

  const [contactInfo, setContactInfo] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);
  const [canSend, setCanSend] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    // Actualiza el estado del botón según los errores (si los campos del estado error estan vacios y si los valores de los inputs no están vacios)
    const formIsValid = Object.values(errors).every((err) => err === "") &&
      Object.values({ ...contactInfo, [name]: value }).every((field) => field.trim() !== "");

    setCanSend(formIsValid);
  };

  // Para poder enviar el formulario, el boton debe estar habilitado, y para esto ya se realiza una comprobación previa de los Inputs
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setIsSend(true);
    setCanSend(false);
    setTimeout(() => {
      state(false);
    }, 2500);
  };
  useEffect(() => {
    if (isSend) {
      const allFieldsValid =
        contactInfo.nombre.trim() !== "" &&
        contactInfo.email.trim() !== "" &&
        contactInfo.descripcion.trim() !== "" &&
        Object.values(errors).every((error) => error === "");

      if (allFieldsValid) {
        sendData(contactInfo);
        setIsSend(false);
      }
    }
  }, [isSend, errors]);


  const sendData = async ({ nombre, email, descripcion }) => {
    try {
      const response = await fetch('https://club-filete-backend.vercel.app/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, descripcion })
      });
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "nombre") {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        error = "El nombre solo puede contener letras y espacios.";
      }
    } else if (name === "email") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
        error = "Ingrese un email válido.";
      }
    } else if (name === "descripcion") {
      if (value.length > 200) {
        error = "El mensaje no puede exceder los 200 caracteres.";
      }
    }
    return error;
  };

  return (
    (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
        {isSuccess && <SuccessMessage onClose={() => setIsSuccess(false)} />}
        <div className="bg-[#181818] bg-opacity-55 text-white w-[90%] max-w-lg rounded-lg shadow-lg relative py-10">
          <button
            className="absolute top-4 right-4 text-white hover:text-[#CDA053] focus:outline-none"
            onClick={() => state(false)}
          >
            ✖
          </button>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={contactInfo.nombre}
                    className={`peer w-full mt-1 p-2 bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] 
      placeholder-transparent focus:ring-[#CDA053] focus:outline-none`}
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="nombre"
                    className={`absolute px-2 left-2 top-3 text-sm font-medium text-[#fefffbb8] transition-all transform 
      ${contactInfo.nombre
                        ? '-translate-y-6 scale-90 text-[#CDA053] bg-[#181818]'
                        : 'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100'} 
      peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[#CDA053] peer-focus:bg-[#181818]`}
                  >
                    Nombre
                  </label>
                  {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    className="peer w-full mt-1 p-2 bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] 
                  placeholder-transparent focus:ring-[#CDA053] focus:outline-none"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute px-2 left-2 top-3 text-sm font-medium text-[#fefffbb8] transition-all transform 
                  ${contactInfo.email
                        ? '-translate-y-6 scale-90 text-[#CDA053] bg-[#181818]'
                        : 'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100'} 
      peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[#CDA053] peer-focus:bg-[#181818]`}
                  >
                    Email
                  </label>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-[#fefffbb8]"
                >
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  rows="4"
                  className="w-full mt-1 p-2 bg-transparent text-[#FEFFFB] rounded border border-[#cda05377] focus:ring-[#CDA053] focus:outline-none"
                  onChange={handleChange}
                ></textarea>
                {errors.descripcion && <p className="text-xs text-red-500 mt-1">{errors.descripcion}</p>}

              </div>
              <div className="justify-self-center">
                <Button text={"Enviar"} btnType={"submit"} state={!canSend} />
              </div>
            </form>
          </div>
        </div>
      </div>
    ));
}
