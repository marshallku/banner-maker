import crtElt from "crtelt";
import { canvasStore } from "../store";
import Input from "./Input";

export default function Resize() {
    const { width, height, setWidth, setHeight } = canvasStore;

    return crtElt(
        "div",
        { className: "size" },
        Input({
            title: "Width",
            className: "size__input",
            type: "number",
            value: `${width}`,
            onChange({ target }) {
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
            value: `${height}`,
            onChange({ target }) {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setHeight(target.valueAsNumber);
            },
        })
    );
}
