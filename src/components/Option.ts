import { canvasStore } from "../store";
import el from "../utils/el";
import Input from "./Input";
import SelectFont from "./SelectFont";
import SelectImage from "./SelectImage";
import Textarea from "./Textarea";

export default function Option() {
    const {
        fontSize,
        fontColor,
        backgroundColor,
        setFontSize,
        setFontColor,
        setBackgroundColor,
    } = canvasStore;

    return el(
        "div",
        { className: "option" },
        Textarea(),
        SelectFont(),
        Input({
            title: "Font Size",
            className: "option__input",
            type: "number",
            value: `${fontSize}`,
            onChange({ target }) {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setFontSize(target.valueAsNumber);
            },
        }),
        Input({
            title: "Font Color",
            className: "option__input",
            type: "color",
            value: fontColor,
            onChange({ target }) {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setFontColor(target.value);
            },
        }),
        Input({
            title: "Background Color",
            className: "option__input",
            type: "color",
            value: backgroundColor,
            onChange({ target }) {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setBackgroundColor(target.value);
            },
        }),
        SelectImage()
    );
}
