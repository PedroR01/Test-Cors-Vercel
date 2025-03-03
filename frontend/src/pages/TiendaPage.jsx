import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import pincelesFondo from "../img/tienda/fondoTienda.jpeg";
import listaPrecios from "../img/tienda/listaPrecios2024.jpg"

export default function TiendaPage() {

    const handleEmailClick = () => {
        // Redirige al cliente de correo con el mail predefinido
        window.location.href = `mailto:elclubdelfilete@gmail.com`;
    };

    return (
        <>
            <Helmet>
                <title>Tienda</title>
                <meta
                    name="description"
                    content="¡Encargá piezas y/o materiales para tus propios filetes!"
                />
                <link rel="canonical" href="/tienda" />
            </Helmet>
            <div className="bg-[#24222B] min-h-screen pt-28">
                <header className="p-4 text-center">
                    <h1 className="allura-regular">
                        ¡Bienvenidos a la Tienda del Club del Filete!
                    </h1>
                    <p className="text-xl mt-2">
                        ¡Tenemos todo lo que necesitas y hacemos envíos a todo el Mundo!<br />
                        Hacé tu pedido directamente a nosotros <span className="font-semibold text-[#CDA053]">elclubdelfilete@gmail.com</span>
                    </p>
                    <div className="w-fit justify-self-center mt-6">
                        <Button text={"Consultar Precios"} btnType={"button"} event={handleEmailClick} />
                    </div>
                </header>

                <main className="max-w-6xl mx-auto py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
                        {/* Columna 1: Cards */}
                        <div className="space-y-8">
                            <ProductCard
                                title="Pinceles Carnevale"
                                description="Pinceles de alta calidad para tus proyectos artísticos."
                                imageSrc={pincelesFondo}
                            />
                            <ProductCard
                                title="Pinceles Tigre Serie 803"
                                description="Precisión y durabilidad en cada trazo con los pinceles Tigre."
                                imageSrc={pincelesFondo}
                            />
                        </div>

                        {/* Columna 2: Imagen */}
                        <div className="hidden md:flex justify-center items-start">
                            <img
                                src={listaPrecios}
                                alt="Pinceles tienda"
                                className="h-auto w-auto rounded-lg shadow-xl"
                            />
                        </div>

                        {/* Columna 3: Cards */}
                        <div className="space-y-8">
                            <ProductCard
                                title="Esmalte al Agua 130ml"
                                description="Colores rojo, amarillo, azul, blanco y negro para todo tipo de superficies."
                                imageSrc={pincelesFondo}
                            />
                            <ProductCard
                                title="Barniz al Agua 130ml"
                                description="Protege y da acabado a tus proyectos con nuestro barniz."
                                imageSrc={pincelesFondo}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}