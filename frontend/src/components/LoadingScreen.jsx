export default function LoadingScreen() {
    return (
      <div className="bg-[#8F272A] min-h-screen flex flex-col items-center justify-center text-white font-sans">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Verificando sesión...</p>
      </div>
    );
  }
  