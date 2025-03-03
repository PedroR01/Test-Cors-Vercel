import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import { BoldIcon, ItalicIcon, UnderlineIcon, EraserIcon, Heading2Icon, Heading4Icon, ListIcon, ListOrderedIcon, QuoteIcon, MinusIcon, UndoIcon, RedoIcon, PaletteIcon, LetterTextIcon, YoutubeIcon, FileTextIcon, ImageIcon } from 'lucide-react';

import { pdfDownloadExtension } from './text-editor/pdfDownloadExtension.js';
import { DraggableImage } from "./text-editor/DraggableImage.js";
import { YoutubeVideo } from "./text-editor/YoutubeVideo.js";

const MenuBar = ({ editor, insertVideo, onAddImage }) => {
    const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

    if (!editor) return null;

    // Listeners para mostrar un tooltip de la herramienta con :hover
    const showTooltip = (event, text) => {
        const { clientX, clientY } = event;
        setTooltip({ visible: true, text, x: clientX, y: clientY + 20 });
    };
    const hideTooltip = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

    // Metodo para la herramienta de añadir btn de pdf
    const addPdfDownload = () => {
        const url = prompt("Ingrese la URL del PDF:");
        if (!url) return;
        else {
            const title = prompt("Ingrese el título del PDF:");
            editor.chain().focus().insertContent(`<pdf-download url="${url}" title="${title}"/>`).run();
        }

    };
    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (event) => {
            const files = event.target.files;
            if (files.length > 0) {
                const content = Array.from(files).map((file) => {
                    if (onAddImage) {
                        onAddImage(file);
                    }
                    const imageUrl = URL.createObjectURL(file);
                    return `<img src="${imageUrl}" alt="${file.name}" />`;
                }).join(''); // Une todas las imágenes en un solo string

                editor.chain().focus().insertContent(content).run();
            }
        };

        input.click();
    };
    return (
        <div className="relative">
            <div className="flex flex-wrap py-2 px-4 gap-10 bg-[#2D2B35] border-b-2 border-[#24222B] rounded-t-xl text-[#FEFFFB]">
                {/* Grupo de Estilos de Texto */}
                <div className="flex gap-2">
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''} onMouseEnter={(e) => showTooltip(e, "Negrita")} onMouseLeave={hideTooltip}>
                        <BoldIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''} onMouseEnter={(e) => showTooltip(e, "Cursiva")} onMouseLeave={hideTooltip}>
                        <ItalicIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''} onMouseEnter={(e) => showTooltip(e, "Subrayado")} onMouseLeave={hideTooltip}>
                        <UnderlineIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} onMouseEnter={(e) => showTooltip(e, "Eliminar Formato")} onMouseLeave={hideTooltip}>
                        <EraserIcon size={20} />
                    </button>
                </div>
                {/* Grupo de Encabezados y Párrafos */}
                <div className="flex gap-2">
                    <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
                        <LetterTextIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
                        <Heading2Icon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
                        <Heading4Icon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().setColor('#CDA053').run()} className={editor.isActive('textStyle', { color: '#CDA053' }) ? 'is-active' : 'text-[#FEFFFB]'}>
                        <PaletteIcon size={20} />
                    </button>
                </div>

                {/* Grupo de Listas y Citas */}
                <div className="flex gap-2">
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
                        <ListIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
                        <ListOrderedIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
                        <QuoteIcon size={20} />
                    </button>
                    <button type="button" onClick={addPdfDownload}>
                        <FileTextIcon size={20} />
                    </button>
                </div>

                {/* Grupo de Elementos y Formato */}
                <div className="flex gap-2">
                    <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <MinusIcon size={20} />
                    </button>
                </div>

                {/* Grupo de Acciones */}
                <div className="flex gap-2">
                    <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                        <UndoIcon size={20} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                        <RedoIcon size={20} />
                    </button>
                </div>
                <button
                    type="button"
                    onClick={insertVideo} // Llama a la función insertVideo}
                    onMouseLeave={hideTooltip}
                >
                    <YoutubeIcon size={20} /> {/* Ícono de YouTube */}
                </button>
                <button type="button" onClick={addImage}>
                    <ImageIcon size={20} />
                </button>

            </div>

            {tooltip.visible && (
                <div
                    className="absolute bg-black text-white text-sm px-2 py-1 rounded z-50"
                    style={{ top: 30, left: 30 }}
                >
                    {tooltip.text}
                </div>
            )}
        </div>
    );
};

export default function TextEditor({ blogContent, onChange, images, onAddImage }) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            pdfDownloadExtension,
            TextStyle,
            Color,
            Underline.configure({
                HTMLAttributes: {
                    class: 'decoration-[#CDA053] decoration-2',
                }
            }),
            DraggableImage,
            YoutubeVideo,
        ],
        editorProps: {
            attributes: {
                class: 'bg-[#2D2B35] h-96 rounded-b-xl overflow-x-auto px-4 pt-4 pb-8'
            }
        },
        content: blogContent,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        immediatelyRender: true,
    });

    const getEmbedUrl = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    const addYoutubeVideo = () => {
        const url = prompt("Ingrese la URL de YouTube");
        const embedUrl = getEmbedUrl(url);

        if (embedUrl) {
            editor.chain().focus().insertContent({
                type: "youtube",
                attrs: { src: embedUrl, width: 200, height: 200 },
            }).run();
        } else {
            alert("URL no válida, por favor ingrese un enlace de YouTube.");
        }
    };
    
    useEffect(() => {
        if (editor && blogContent) {
            // Compare current content with blogContent
            if (editor.getHTML() !== blogContent) {
            editor.commands.setContent(blogContent);
            }
        }
    }, [blogContent, editor]);
          
    const handleDrop = (e) => {
        e.preventDefault();
        if (!editor) return;

        const files = e.dataTransfer.files;
        const allowedTypes = ['image/jpeg', 'image/png']; // jpg y jpeg tienen el mismo MIME type

        // Se filtran y mapean las imágenes válidas
        const imagesHTML = Array.from(files)
            .filter((file) => allowedTypes.includes(file.type))
            .map((file) => {
                if (onAddImage) {
                    onAddImage(file);
                }
                const imageUrl = URL.createObjectURL(file);
                return `<img src="${imageUrl}" alt="${file.name}" />`;
            })
            .join('');

        if (imagesHTML) {
            editor.chain().focus().insertContent(imagesHTML).run();
        }
    };

    // Función para evitar el comportamiento por defecto del dragover
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <MenuBar editor={editor} insertVideo={addYoutubeVideo} onAddImage={onAddImage} />
            <div onDragOver={handleDragOver} onDrop={handleDrop}>
                <EditorContent editor={editor} />
            </div>
        </>

    );
};
