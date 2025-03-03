import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import portadaEsencial from "../../img/cursos/cursoEsencial.jpg";
import portadaLetras from "../../img/cursos/letrasPorteñas.jpg";
import portadaMembresia from "../../img/cursos/membresia.webp";
import Button from "../Button";
import Workshop from "../Workshop";

export default function Academia() {
    // Estado inicial con cursos
    const cursos = [
        {
            titulo: "Curso esencial",
            duracion: "8 módulos",
            descripcion:
                "Te voy a enseñar paso a paso y desde cero a que pintes tu primer cuadro fileteado listo para colgar en la pared, vamos a recorrer la historia del Filete y te voy a mostrar los materiales, elementos, herramientas y soportes que se usan en la técnica tradicional, te voy a guiar para que puedas componer tus propias obras y pintarlas con el método de los 5 pasos para darle vida a tus diseños!",
            imagenes: [portadaEsencial],
            link: "https://elclubdelfilete.tiendup.com/curso/el-club-del-filete",
        },
        {
            titulo: "Letras Porteñas",
            duracion: "4 módulos",
            descripcion:
                "Aprende paso a paso y desde cero como realizar tus propias letras fileteadas con el método de Los 3 pilares. Te voy a guiar por un proceso paso a paso comprobado donde vas a aprender a manejar la estructura, los recursos y el color, para poder crear tus tipografías y darle la identidad que estás buscando. Además tendrás el bonus para armar palabras y frases!",
            imagenes: [portadaLetras],
            link: "https://elclubdelfilete.tiendup.com/curso/3-pilares-de-las-letras-fileteadas",
        },
        {
            titulo: "Membresía",
            duracion: "",
            descripcion:
                "Bienvenidx a la Membresía del Club del Filete, dentro vas a encontrar el acceso a todos los cursos y las clases gratuitas de instagram! También tendrás acceso a la comunidad de Artistas Latinoamericanos y a la bolsa de trabajo donde podrás ofrecer tus obras al mercado internacional.",
            imagenes: [portadaMembresia],
            link: "https://elclubdelfilete.tiendup.com/page/paginapreinscripcion",
        },
    ];
    const [currentCurso, setCurrentCurso] = useState(cursos[0]);

    const handleCursoChange = (index) => {
        setCurrentCurso(cursos[index]);
    };

    return (
        <section
            id="academia"
            className="flex flex-col relative bg-gradient-to-b from-[#8F272A] to-[#222121] w-full md:min-h-[80vh] rounded-t-3xl py-20 lg:pt-32 shadow-academia gap-24 md:gap-11 lg:gap-0 md:rounded-t-[3rem] md:pt-24 transition-transform duration-300 -translate-y-12"
        >
            <h2 className="allura-regular text-[#CDA053] text-6xl text-center mb-8 capitalize">Academia</h2>
            <article className="flex flex-col md:flex-row min-h-[21.5rem] gap-8 md:gap-32 w-full md:w-[90%] md:items-center ml-auto mr-auto md:pt-8">
                {/* Contenido dinámico animado */}
                <AnimatePresence>
                    <motion.div
                        key={currentCurso.titulo} // Cambiar la key dispara el remount y animación
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0, position: "absolute", alignSelf: "anchor-center" }}
                        transition={{ type: "spring", bounce: .6, duration: 1.3, ease: "easeInOut" }}
                        className="justify-items-center md:justify-items-start "
                    >
                        <h2 className="w-4/5 md:w-auto afacad-bold text-[#CDA053] text-3xl text-left uppercase">
                            {currentCurso.titulo}
                        </h2>
                        <div className="w-4/5 mt-8 md:w-full">
                            <span className="text-base afacad-normal xl:text-lg text-[#fefffba7]">
                                {currentCurso.duracion}
                            </span>
                            <p className="text-base xl:text-xl w-full">{currentCurso.descripcion}</p>
                            <div className="mt-4 md:mt-12">
                                <Button
                                    text={"Acceder"}
                                    btnType={"button"}
                                    event={() => window.open(currentCurso.link)}
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="relative left-11 md:mt-16 self-center md:self-auto">
                    {/* Workshop actualizado para manejar clicks que cambian el curso */}
                    <Workshop handleClick={(cardIndex) => handleCursoChange(cardIndex)} />
                </div>
            </article>
        </section>
    );
}
