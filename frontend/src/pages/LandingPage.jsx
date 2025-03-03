import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Button from "../components/Button";
import logoWP from "../img/logos/wp.png";

// Carga diferida de componentes
const Academia = lazy(() => import("../components/sections/Academia"));
const Galeria = lazy(() => import("../components/sections/Galeria"));
const Modal = lazy(() => import("../components/Modal"));

export default function LandingPage() {
    const [modal, setModal] = useState(false);

    // Bloquear/desbloquear scroll al abrir/cerrar modal
    useEffect(() => {
        document.body.style.overflow = modal ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [modal]);

    return (
        <>
            <Helmet>
                <title>El Club del Filete - Inicio</title>
                <meta
                    name="description"
                    content="Explora el arte del fileteado porteño, sus orígenes, y la cálida comunidad de El Club del Filete."
                />
                <link rel="canonical" href="/" />
            </Helmet>

            <div className="overflow-hidden">
                {/* Sección Intro con animación */}
                <section className="flex relative intro justify-center md:justify-normal md:min-h-[40rem]" >
                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col w-4/5 items-center justify-center md:justify-normal md:items-start md:w-[70%] lg:w-3/5 md:mt-auto md:mb-20 lg:mb-40 md:ml-20 lg:pt-28"
                    >
                        <h1 className="allura-regular text-[#CDA053] text-6xl leading-[1.10] tracking-wide">
                            Filete <br />para el Mundo
                        </h1>
                        <p className="afacad-normal text-[#FEFFEB] text-base lg:text-lg tracking-wide leading-7 md:tracking-wider md:w-3/4 lg:w-2/3 mt-3">
                            ¡Bienvenidxs a <span className="text-[#CDA053]">El Club del Filete!</span> La Primera Comunidad Online dedicada al Filete Porteño y al Arte Latinoamericano, donde nace la Primera Academia Virtual de Filete, llevando esta poderosa técnica a todos los rincones del Mundo.
                        </p>
                        <div className="mt-10">
                            <Button text={"Contactame"} btnType={"button"} event={() => setModal(true)} state={false} />
                        </div>
                    </motion.div>
                </section>
                {/* Carga diferida de Academia con animación */}
                <Suspense fallback={<div className="text-white text-center p-10">Cargando...</div>}>
                    <motion.div
                        initial={{ opacity: .8, y: 0 }}
                        whileInView={{ opacity: 1, y: -15 }}
                        viewport={{ once: true }}
                        transition={{ duration: .6 }}
                    >
                        <Academia />
                    </motion.div>
                </Suspense>

                {/* Sección Galería con animación */}
                <motion.section
                    id="galería"
                    className="pt-20 bg-[#222121]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                >
                    <h2 className="allura-regular text-[#CDA053] text-6xl text-center mb-8 capitalize">Galería</h2>

                    {/* Carga diferida de Galería */}
                    <Suspense fallback={<div className="text-white text-center p-10">Cargando...</div>}>
                        <motion.div
                            initial={{ opacity: .8, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <Galeria />
                        </motion.div>
                    </Suspense>
                </motion.section>

                {/* Icono de WhatsApp */}
                <a href="https://wa.me/5492214959043" target="_blank">
                    <img src={logoWP} alt="WhatsApp" className="fixed opacity-60 bottom-7 right-7 w-14 h-14 rounded-full hover:scale-125 hover:shadow-xl hover:opacity-100 transition transform duration-700" />
                </a>



                {/* Modal de Contacto (Lazy Load) */}
                <Suspense fallback={<div className="text-white text-center p-10">Cargando...</div>}>
                    {modal && <Modal state={(e) => setModal(e)} />}
                </Suspense>
            </div>
        </>
    );
}
