import { canvasStore } from "../store";
import el from "../utils/el";
import Input from "./Input";

export default function Resize() {
    const { setWidth, setHeight } = canvasStore;
    const canvasSize = import.meta.env.VITE_CANVAS_SIZE;

    return el(
        "div",
        { className: "size" },
        Input({
            title: "Width",
            className: "size__input",
            type: "number",
            value: canvasSize,
            onChange: ({ target }) => {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setWidth(target.valueAsNumber);
            },
        }),
        Input({
            title: "Height",
            className: "size__input",
            type: "number",
            value: canvasSize,
            onChange: ({ target }) => {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setHeight(target.valueAsNumber);
            },
        })
    );
}
