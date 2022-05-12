import el from "../utils/el";
import Input from "./Input";

export default function Resize() {
    const canvasSize = import.meta.env.VITE_CANVAS_SIZE;

    return el(
        "div",
        { id: "resize", className: "flex center" },
        Input({
            title: "Width",
            id: "width",
            type: "number",
            value: canvasSize,
        }),
        Input({
            title: "Height",
            id: "height",
            type: "number",
            value: canvasSize,
        })
    );
}
