import { canvasStore } from "../store";
import el, { eln } from "../utils/el";
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
        SelectImage(),
        el(
            "a",
            {
                id: "download",
                download: "thumbnail",
                className: "button center",
            },
            eln(
                "svg",
                { viewBox: "0 0 416 448", className: "icon-download" },
                eln("path", {
                    d: "M320 336c0-8.75-7.25-16-16-16s-16 7.25-16 16 7.25 16 16 16 16-7.25 16-16zM384 336c0-8.75-7.25-16-16-16s-16 7.25-16 16 7.25 16 16 16 16-7.25 16-16zM416 280v80c0 13.25-10.75 24-24 24h-368c-13.25 0-24-10.75-24-24v-80c0-13.25 10.75-24 24-24h116.25l33.75 34c9.25 9 21.25 14 34 14s24.75-5 34-14l34-34h116c13.25 0 24 10.75 24 24zM334.75 137.75c2.5 6 1.25 13-3.5 17.5l-112 112c-3 3.25-7.25 4.75-11.25 4.75s-8.25-1.5-11.25-4.75l-112-112c-4.75-4.5-6-11.5-3.5-17.5 2.5-5.75 8.25-9.75 14.75-9.75h64v-112c0-8.75 7.25-16 16-16h64c8.75 0 16 7.25 16 16v112h64c6.5 0 12.25 4 14.75 9.75z",
                })
            ),
            "Download Image"
        )
    );
}
