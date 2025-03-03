import { useLocation } from 'react-router-dom';
import Button from "../../components/Button";

export default function BlogPage() {
    const location = useLocation();
    const { content } = location.state || {};

    return (
        <div className="w-full bg-[#8F272A] pt-24 min-h-screen">
            <article className="w-full max-w-3xl mx-auto px-4">
                {/* Imagen principal */}
                <img
                    className="absolute w-full h-72 left-0 -top-2 object-cover rounded-lg shadow-md brightness-50"
                    src={content.bucket_folder_url + "/portrait"}
                    alt="Caratula de noticia destacada"
                />
                <div className="relative mb-8">
                    <h1 className="flex items-center justify-center hamston text-[#CDA053] text-2xl md:text-4xl bg-black bg-opacity-50 py-4 px-6 z-10">
                        {content.title}
                    </h1>
                </div>

                {/* Contenido de la noticia */}
                <section className="pt-28 pb-14 px-6 md:px-0" dangerouslySetInnerHTML={{ __html: content.content_sections }}>




                </section>
            </article>
        </div>
    );
}
