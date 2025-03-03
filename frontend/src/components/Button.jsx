export default function Button({ icon, text, btnType, event, state, contentSizeMobile }) {
  return (
    <button
      className={`relative w-full border-2 backdrop-blur-sm border-[#CDA053] text-[#CDA053] font-bold afacad-bold ${contentSizeMobile ? contentSizeMobile : "py-3 px-6 text-lg"} rounded-full shadow-xl md:text-2xl md:rounded-3xl md:py-1 md:px-12 transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105 enabled:hover:brightness-125 enabled:active:scale-95 disabled:brightness-50 disabled:hover:cursor-not-allowed`}
      type={btnType}
      onClick={event}
      disabled={state}
    >
      {icon ? (
        <div className="flex items-center gap-4">
          {icon}
          {text}
        </div>
      ) : (text)}

    </button>

  );
}
