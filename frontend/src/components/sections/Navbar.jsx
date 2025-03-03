import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logoIntro from "../../img/logos/logoIntro.png";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [activeRoute, setActiveRoute] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    setActiveRoute(location.pathname); // Actualiza la ruta activa al cambiar la URL
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50)
        setShowNavbar(false);
      else setShowNavbar(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSmoothScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Condicionar si las rutas deben estar habilitadas o no
  const isHomePage = location.pathname === "/";

  // Constantes para las animaciones del menu desplegable desde el logo.
  const animateVariants = {
    show: {
      x: -40,
      y: -10,
      height: 150,
      opacity: 1,
      visibility: "visible",
      transition: { type: "spring", bounce: 0.6, duration: 1.3, ease: "easeInOut" },
    },
    hide: {
      x: -40,
      y: -10,
      height: 0,
      opacity: 0,
      visibility: "hidden",
      transition: { type: "spring", bounce: 0.6, duration: 1.3, ease: "easeInOut" },
    },
  };

  return (
    <>
      <nav
        className={`fixed pb-4 md:pb-0 top-0 w-full min-h-[10%] z-50 bg-[#24222B]/35 backdrop-blur-sm transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between md:justify-center px-4 lg:px-24 py-2 lg:py-4">
          <ul className="contents md:flex items-center gap-5 hamston text-base text-[#CDA053]">
            <li className="hidden md:block">
              <a href="/historia" className={`nav-link ${activeRoute === "/historia" ? "brightness-125 scale-125" : ""}`}>
                Historía
                <span className="underline-img"></span>
              </a>
            </li>
            <li className="hidden md:block">
              <a href="/tienda" className={`nav-link ${activeRoute === "/tienda" ? "brightness-125 scale-125" : ""}`}>
                Tienda
                <span className="underline-img"></span>
              </a>
            </li>
            <li className="group relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <button className="group-hover:scale-110 transition-transform duration-300">
                <img className="h-16" src={logoIntro} alt="Logo Navbar" />
                <ChevronDown className="absolute translate-x-7" />
              </button>

              {/* Menú desplegable de la imagen*/}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    variants={animateVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    transition={{ type: "spring", bounce: 0.6, duration: 1.3, ease: "easeInOut" }}
                    className="absolute justify-items-center py-2 -translate-y-1 mt-2 w-40 bg-[#24222B] text-white rounded-lg shadow-lg transition-opacity duration-300"
                  >
                    {/* Opciones del menú */}
                    <li>
                      <a
                        href="/"
                        className="block px-4 py-2 transition nav-link"
                        onClick={() => isHomePage && setIsDropdownOpen(false)}
                      >
                        Inicio
                        <span className="underline-img"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#academia"
                        className="block px-4 py-2 transition nav-link"
                        onClick={(e) => {
                          if (isHomePage) {
                            handleSmoothScroll(e, "#academia");
                            setIsDropdownOpen(false);
                          }
                        }}
                      >
                        Academia
                        <span className="underline-img"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#galería"
                        className="block px-4 py-2 transition nav-link"
                        onClick={(e) => {
                          if (isHomePage) {
                            handleSmoothScroll(e, "#galería");
                            setIsDropdownOpen(false);
                          }
                        }}
                      >
                        Galería
                        <span className="underline-img"></span>
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li className="hidden md:block">
              <a href="/novedades" className={`nav-link ${activeRoute === "/novedades" ? "brightness-125 scale-125" : ""}`}>
                Novedades
                <span className="underline-img"></span>
              </a>
            </li>
            <li className="hidden md:block ">
              <a href="#" className={`${activeRoute === "/cursos" ? "brightness-125 scale-125" : "cursor-not-allowed"} brightness-50`}>
                Cursos
                <span className="underline-img"></span>
              </a>
            </li>
            <li className="md:hidden">
              <button
                className="block text-[#CDA053] focus:outline-none"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-[#222121] text-[#FEFFEB] z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          className="absolute top-4 right-4 text-[#CDA053] focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul className="flex flex-col items-start gap-6 mt-16 px-6 text-base hamston">
          <li>
            <a href="/historia" onClick={toggleSidebar}>
              Historía
            </a>
          </li>
          <li>
            <a href="/tienda" onClick={toggleSidebar}>
              Tienda
            </a>
          </li>
          <li>
            <a href="/novedades" onClick={toggleSidebar}>
              Novedades
            </a>
          </li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
