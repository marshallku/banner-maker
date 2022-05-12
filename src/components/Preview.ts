import el from "../utils/el";

export default function Preview() {
    const canvasSize = +import.meta.env.VITE_CANVAS_SIZE;

    return el(
        "div",
        { className: "flex center" },
        el("canvas", { id: "preview", width: canvasSize, height: canvasSize })
    );
}
