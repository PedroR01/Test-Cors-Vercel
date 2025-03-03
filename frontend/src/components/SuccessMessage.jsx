import { useEffect, useState } from "react";

export default function SuccessMessage({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out after 2 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      // Trigger onClose after fade-out animation ends
      setTimeout(onClose, 500); // Wait for fade-out animation to finish
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-[#181818] text-white px-6 py-4 rounded shadow-lg flex items-center justify-center space-x-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* Icon or image */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8 text-green-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Text */}
      <p className="text-lg font-medium">¡Formulario enviado con éxito!</p>
    </div>
  );
};
