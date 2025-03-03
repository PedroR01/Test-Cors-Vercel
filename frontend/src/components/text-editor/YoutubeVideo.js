import { Node } from "@tiptap/core";

export const YoutubeVideo = Node.create({
  name: "youtube",
  group: "block",
  draggable: true, // ✅ Permite arrastrar el video
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: 640 },
      height: { default: 480 },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-youtube-video]" }];
  },

  renderHTML({ node }) {
    return [
      "div",
      {
        "data-youtube-video": "",
        "data-drag-handle": "", // ✅ Todo el div es arrastrable
        "contenteditable": "false", // ✅ No editable dentro del editor
        style: `
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          cursor: grab;
          border: 1px dashed gray;
          border-radius: 5px;
        `,
      },
      [
        "iframe",
        {
          src: node.attrs.src,
          width: node.attrs.width,
          height: node.attrs.height,
          frameborder: "0",
          allowfullscreen: "true",
        },
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-youtube-video", "");
      wrapper.setAttribute("data-drag-handle", ""); // ✅ Todo el div es el handle
      wrapper.contentEditable = "false";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "center";
      wrapper.style.padding = "10px";
      wrapper.style.cursor = "grab";
      wrapper.style.border = "1px dashed gray";
      wrapper.style.borderRadius = "5px";

      const iframe = document.createElement("iframe");
      iframe.src = node.attrs.src;
      iframe.width = node.attrs.width;
      iframe.height = node.attrs.height;
      iframe.frameBorder = "0";
      iframe.allowFullscreen = true;

      wrapper.draggable = true;
      wrapper.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/html", wrapper.outerHTML);
      });

      wrapper.appendChild(iframe);

      return {
        dom: wrapper,
      };
    };
  },
});
