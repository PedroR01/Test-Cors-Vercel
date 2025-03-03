import { Node } from "@tiptap/core";

export const DraggableImage = Node.create({
  name: "image",
  group: "block",
  draggable: true, // Habilita el arrastre
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      title: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "img" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      {
        ...HTMLAttributes,
        draggable: "true",
        contenteditable: "false",  // Evita interferencias de edición en TipTap
        ondragstart: "event.dataTransfer.setData('text/plain', null)",  // Forzar el drag
      },
    ];
  }
  ,
});
