import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from '../context/AuthContextFunct';
import serverUrl from './utils/serverUrl';
import { PencilIcon, Trash2Icon } from 'lucide-react';

export default function BlogPortrait({ content, orientation }) {
    const { isAuthenticated } = useContext(AuthContext); // Obtenemos el estado de autenticación
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [targetBlog, setTargetBlog] = useState({});

    const navigate = useNavigate();

    // Estilado por defecto para el caso del main
    let descriptionContainerStyle = "absolute bottom-10 left-3 right-3 md:left-9";
    let containerStyle = "w-full";
    let featuredStyle = "flex bg-[#3c3228] hover:-translate-y-2 transition-transform duration-500 col-span-7 lg:col-span-4 row-span-2 lg:row-span-3 shadow-blog-main pb-6 md:rounded-3xl";

    if (orientation === "vertical") {
        descriptionContainerStyle = "flex flex-col justify-center px-[2.2rem] my-8 inline-flex";
        containerStyle = "w-[85%] h-[44%] flex-shrink-0 justify-self-center relative";
    }
    else if (orientation === "horizontal") {
        descriptionContainerStyle = "flex flex-col justify-center px-8 my-2";
        containerStyle = "h-full w-2/5 flex-shrink-0 relative";
        featuredStyle = "flex bg-[#3c3228] hover:-translate-y-2 transition-transform duration-500 shadow-blog-main mx-6 rounded-3xl";
    }

    /* Manejo del delete de la novedad */

    // Advertencia
    const handleDeleteWarning = (blogContent) => {
        // Abrir modal de confirmación para eliminar la novedad
        console.log(blogContent);
        setTargetBlog(blogContent);
        setConfirmationModal(true);
    }

    // Eliminar
    const handleDelete = async (blogContent) => {
        // Abrir modal de confirmación para eliminar la novedad
        /*
        Me quedo con el contenido filtrado del blog por si falla la eliminación
        de imágenes, en el cual yo reinserto la tupla si no se pueden eliminar sus imagenes
        */

        const { id, created_at, ...filteredData } = blogContent;

        try {
            const responseDeleteBlog = await fetch(`${serverUrl.produccion}/api/blogs`, {
                method: 'DELETE', // Método DELETE para eliminar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: blogContent.title }) // Enviar el título en JSON
            });

            if (!responseDeleteBlog.ok) {
                throw new Error('Error en la eliminación del blog');
            }
            else {
                console.log("Contenido del blog eliminado");
                const responseDeleteImg = await fetch(`${serverUrl.produccion}/api/storage`, {
                    method: 'DELETE', // Método DELETE para eliminar
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ folderName: blogContent.title }) // Enviar el título en JSON
                });
                if (!responseDeleteImg.ok) {
                    const responseDataUpload = await fetch(`${serverUrl.produccion}/api/blogs`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(filteredData)
                    });
                    if (responseDataUpload.ok) {
                        console.log("Hubo un error al eliminar las imagenes, se revirtió la eliminacion")
                    }

                }
                // Hago reset de la page
                navigate(0);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    {/* <div className="relative right-0 w-full z-10 grid col-span-4">
<div className="flex gap-2 absolute right-0  translate-x-2 -translate-y-2"> */}
    // Si es otro que no sea main que tenga las clases especificas que no se comparten entre las de arriba y las de abajo
    // contenedor = '' 

    return (
        <>
            {confirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <div className="bg-[#181818] bg-opacity-55 text-white w-[90%] max-w-lg rounded-3xl shadow-lg relative py-4 border-2 border-[#181818]/75">
                        <div className='flex flex-row justify-between relative pb-6 border-b-2 border-[#181818]/75'>
                            <h4 className='ml-8'>¿Eliminar la novedad <span className='italic'>{'"' + targetBlog + '"'}</span> ?</h4>
                            <button
                                className="mr-8 text-white hover:text-[#CDA053] focus:outline-none"
                                onClick={() => setConfirmationModal(false)}
                            >
                                ✖
                            </button>
                        </div>
                        <div className='pt-3 pb-6 border-b-2 border-[#181818]/75'>
                            <p className='opacity-75 ml-8'>Esto no puede deshacerse</p>
                        </div>
                        <div className='flex flex-row justify-self-end pt-3 gap-4 mr-8'>
                            <button className="w-full border-2 backdrop-blur-sm border-[#CDA053] text-[#CDA053] py-2 px-3 rounded-lg shadow-xl transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105 enabled:hover:brightness-125 enabled:active:scale-95" type="button" onClick={() => setConfirmationModal(false)}>Cancelar</button>
                            <button className="w-full bg-[#CDA053] text-[#FEFFFB] px-3  afacad-normal rounded-lg text-lg transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105  enabled:active:scale-95" type="button" onClick={() => {
                                handleDelete(targetBlog);
                                setConfirmationModal(false);
                            }}>Eliminar</button>
                        </div>

                    </div>
                </div>
            )}
            {/* Botones de acción para el administrador */}
            {isAuthenticated && (
                <div className={`${orientation === "main" ? "absolute w-1/2" : "relative w-full right-0 grid col-span-4"} z-10`}>
                    <div className={`absolute right-0 flex gap-2 -translate-y-2`}>
                        <Link to={`/añadirBlog/${content.title}`}
                            state={{ novedad: content }}  // Pasa el objeto 'content' completo
                            className={`px-3 py-3 text-[#CDA053] bg-[#232129] rounded-full text-sm shadow-md transition hover:bg-[#CDA053] hover:text-[#232129] hover:scale-110 duration-300`}>
                            <PencilIcon />
                        </Link>
                        <div className={`px-3 py-3 text-[#CDA053] bg-[#232129] rounded-full text-sm shadow-md transition hover:cursor-pointer hover:bg-[#CDA053] hover:text-[#232129] hover:scale-110 duration-300`} onClick={() => handleDeleteWarning(content)}>
                            <Trash2Icon />
                        </div>
                    </div>
                </div>
            )}
            {/* Contenido de la portada de la novedad */}
            <Link
                to={`./${content.title}`} // Redirige a la página de destino
                state={{ content }}
                className={`${orientation === "vertical" ? "border-2 border-[#802326] rounded-3xl" : `${featuredStyle}`} h-full lg:my-4 overflow-hidden relative group`}
            >

                {
                    <div className={`${containerStyle} ${orientation === "main" ? "" : "group-hover:scale-100 scale-110 transition-transform duration-500"}`}>
                        <img
                            src={content.bucket_folder_url + "/portrait"}
                            alt={content.title}
                            className={`${orientation === "main" ? "group-hover:scale-100 scale-110 transition-transform duration-500 md:rounded-3xl" : "rounded-3xl"} w-full h-full object-cover brightness-50  shadow-blog-main`}
                        />
                        {/* top-6 left-8 */}
                        <span className={`${orientation === "main" ? "text-base" : "text-sm"} top-0 left-0 absolute afacad-bold  w-fit uppercase tracking-wide text-[#CDA053] pb-1 pt-3 pr-4 pl-6 rounded-br-3xl bg-[#8F272A] brightness-90`}>
                            {content.tag}
                        </span>
                    </div>

                }

                <div className={`${descriptionContainerStyle} text-left`}>


                    {orientation === "main" ? (<h2 className="mt-3 leading-tight">
                        {content.title}
                    </h2>) : (<h5 className="mt-3 leading-tight">
                        {content.title}
                    </h5>)}

                    <p className="line-clamp-3 afacad-normal text-base text-[#FEFFEB] mt-2 lg:block">
                        {content.description}
                    </p>
                </div>
            </Link>
        </>
    );
}
