import { useState, useEffect } from "react";

export default function Carousel({ images, clickHandler }) {
  const [selectedIndex, setSelectedIndex] = useState(0); // Índice del elemento seleccionado
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    // Función para verificar la resolución
    const checkResolution = () => {
      setSmallScreen(window.innerHeight <= 844 && window.innerWidth <= 390);
    };

    // Ejecutar la verificación al cargar y al redimensionar la ventana
    checkResolution();
    window.addEventListener("resize", checkResolution);

    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  // Función para manejar el clic en la imagen
  const handleImageClick = (index) => {
    setSelectedIndex(index); // Actualizar el índice seleccionado
    if (clickHandler) {
      clickHandler(index);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {images.map((image, index) => (
        <button
          key={index}
          className={`w-[20%] flex-shrink-0 aspect-[3.5/5] md:aspect-[3.5/4] lg:w-[15%] transition duration-300 rounded-3xl overflow-hidden ${index === selectedIndex
            ? "scale-110 z-10"
            : "scale-90"
            } ${index !== selectedIndex ? "hover:scale-95" : "hover:scale-x-110"}`}
          style={{
            boxShadow: "0 6px 20px rgba(220, 220, 220, 0.2)", // Personalización de sombra
          }}
          onClick={() => handleImageClick(index)}
        >
          <img
            className="w-full h-full object-cover rounded-3xl"
            src={image}
            draggable="false"
            alt={`Slide ${index}`}
          />
        </button>
      ))}
    </div>
  );
}
