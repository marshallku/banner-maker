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
        { className: "flex center column" },
        Textarea(),
        SelectFont(),
        Input({
            title: "Font Size",
            id: "fontSize",
            className: "margin",
            type: "number",
            value: `${fontSize}`,
            onChange(event) {
                const { target } = event;

                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setFontSize(+target.value);
            },
        }),
        Input({
            title: "Font Color",
            id: "textColor",
            className: "margin",
            type: "color",
            value: fontColor,
            onChange(event) {
                const { target } = event;

                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setFontColor(target.value);
            },
        }),
        Input({
            title: "Background Color",
            id: "bgColor",
            className: "margin",
            type: "color",
            value: backgroundColor,
            onChange(event) {
                const { target } = event;

                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setBackgroundColor(target.value);
            },
        }),
        SelectImage()
    );
}
