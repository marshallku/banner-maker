import { canvasStore } from "../store";
import el from "../utils/el";
import Input from "./Input";
import Resize from "./Resize";
import SelectFont from "./SelectFont";
import SelectImage from "./SelectImage";
import Textarea from "./Textarea";

export default function Option() {
    const {
        fontSize,
        subheadingSize,
        tagSize,
        fontColor,
        backgroundColor,
        setFontSize,
        setSubheadingSize,
        setTagSize,
        setFontColor,
        setBackgroundColor,
    } = canvasStore;

    return el(
        "div",
        { className: "option" },
        Resize(),
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
            title: "Font Size(subheading)",
            className: "option__input",
            type: "number",
            value: `${subheadingSize}`,
            onChange({ target }) {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setSubheadingSize(target.valueAsNumber);
            },
        }),
        Input({
            title: "Font Size(tag)",
            className: "option__input",
            type: "number",
            value: `${tagSize}`,
            onChange({ target }) {
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }

                setTagSize(target.valueAsNumber);
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
