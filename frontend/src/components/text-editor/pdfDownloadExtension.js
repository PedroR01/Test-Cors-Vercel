import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import PdfDownloadComponent from "./PdfDownloadComponent.jsx";

export const pdfDownloadExtension = Node.create({
  name: "pdfDownload",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: {
        default: "",
      },
      title: {
        default: "Descargar PDF",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pdf-download",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["pdf-download", HTMLAttributes];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PdfDownloadComponent);
  },
});
