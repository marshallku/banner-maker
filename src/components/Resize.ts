import { canvasStore } from "../store";
import el from "../utils/el";
import Input from "./Input";

export default function Resize() {
    const { setWidth, setHeight } = canvasStore;
    const canvasSize = import.meta.env.VITE_CANVAS_SIZE;

    return el(
        "div",
        { id: "resize", className: "flex center" },
        Input({
            title: "Width",
            id: "width",
            type: "number",
            value: canvasSize,
            onChange: (event) => {
                const { target } = event;

                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setWidth(target.valueAsNumber);
            },
        }),
        Input({
            title: "Height",
            id: "height",
            type: "number",
            value: canvasSize,
            onChange: (event) => {
                const { target } = event;

                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setHeight(target.valueAsNumber);
            },
        })
    );
}
