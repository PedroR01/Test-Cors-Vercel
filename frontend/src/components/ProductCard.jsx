import Button from "./Button";
import bgTexture from "../img/misc/productTextureBg.svg"
import { ShoppingCartIcon } from "lucide-react";

export default function ProductCard({ title, description, imageSrc }) {
    return (
        <div className="border-2 md:min-h-96 md:max-w-72 border-[#2D2B35] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Recuadro de la imagen y Imagen del producto */}
            <div className="flex">
                <div className="relative bg-[#B89A6B] min-w-full min-h-full rounded-xl shadow-blog-main -translate-y-12">
                    <img className="absolute max-w-[40%] max-h-[75%] place-self-anchor-center rounded-lg" src={imageSrc} alt={title} />
                    <img src={bgTexture} alt="background texture" />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold inria-sans-bold text-[#FEFFFB]">{title}</h2>
                <p className="text-base text-[#FEFFFB]/85 inria-sans-regular my-2">{description}</p>
                <div className="max-h-20 max-w-full flex flex-row mt-6 gap-2">
                    <div className="max-w-14">
                        <button
                            className="w-full border-2 backdrop-blur-sm border-[#CDA053] text-[#CDA053] py-2 px-3 rounded-lg shadow-xl transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105 enabled:hover:brightness-125 enabled:active:scale-95"
                            type="button"
                            onClick={() => (1)}
                        >
                            <ShoppingCartIcon />
                        </button>
                    </div>
                    <button
                        className="w-full bg-[#CDA053] text-[#FEFFFB] afacad-normal rounded-lg text-lg transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105  enabled:active:scale-95"
                        type="button"
                        onClick={() => (1)}
                    >
                        Comprar ahora {'>'}
                    </button>
                </div>
            </div>

        </div>
    );
}