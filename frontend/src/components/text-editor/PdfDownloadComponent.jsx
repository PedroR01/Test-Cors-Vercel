import { NodeViewWrapper } from "@tiptap/react";
import Button from "../Button.jsx";
import pdfDownloader from "../utils/pdfDownloader.js"

const PdfDownloadComponent = (props) => {
    const { node } = props;
    const pdf = {
        link: node.attrs.url,
        title: node.attrs.title,
    };

    // Función para manejar el arrastre
    const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", node.attrs.count);
        event.target.classList.add("dragging");
    };

    const handleDragEnd = (event) => {
        event.target.classList.remove("dragging");
    };

    return (
        <NodeViewWrapper
            className="pdf-download"
            contentEditable={false} // Deshabilita edición para que sea arrastrable
            draggable // Habilita el arrastre
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {/* Agrega un área específica como "manejador de arrastre" */}
            <div data-drag-handle style={{ cursor: "grab", padding: "5px" }}>
                <Button text={pdf.title} btnType={"button"} event={() => pdfDownloader(pdf.link, pdf.title)} state={false} /> <span className="text-[#fefffb87] ml-4">📌 Manten aquí para mover 📌</span>
            </div>
        </NodeViewWrapper>
    );
};

export default PdfDownloadComponent;
