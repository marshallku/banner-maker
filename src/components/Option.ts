import el, { eln } from "../utils/el";
import Input from "./Input";

export default function Option() {
    return el(
        "div",
        { className: "flex center column" },
        el(
            "div",
            { id: "textWrap" },
            el("textarea", {
                id: "text",
                placeholder: "Type Here!",
                ariaLabel: "Type Here!",
                rows: 2,
            }),
            el("div", { className: "line top" }),
            el("div", { className: "line" })
        ),
        el(
            "div",
            { className: "inputWrap margin alt" },
            el("span", {}, "Font"),
            el(
                "div",
                {
                    id: "font",
                    className: "dropdown_btn",
                    dataset: {
                        dropdown: "fontList",
                    },
                },
                "Sans-Serif"
            ),
            el(
                "ul",
                { id: "fontList", className: "dropdown_content" },
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "sans-serif" },
                    },
                    "Sans-serif"
                ),
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "Noto Sans KR" },
                    },
                    "Noto Sans KR"
                ),
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "Nanum Gothic" },
                    },
                    "Nanum Gothic"
                ),
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "DungGeunMo" },
                    },
                    "DungGeunMo"
                ),
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "BMJUA" },
                    },
                    "BMJUA"
                ),
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "Black Han Sans" },
                    },
                    "Black Han Sans"
                ),
                el(
                    "li",
                    {
                        className: "material-ripple",
                        dataset: { font: "ghanachoco" },
                    },
                    "Ghana Choco"
                )
            )
        ),
        Input({
            title: "Font Size",
            id: "fontSize",
            className: "margin",
            type: "number",
            value: "64",
        }),
        Input({
            title: "Font Color",
            id: "textColor",
            className: "margin",
            type: "color",
            value: "#ffffff",
        }),
        Input({
            title: "Background Color",
            id: "bgColor",
            className: "margin",
            type: "color",
            value: "#ffffff",
        }),
        el("input", { type: "file", id: "bgImage", className: "hidden" }),
        el(
            "label",
            { htmlFor: "bgImage", className: "button margin center" },
            eln(
                "svg",
                { viewBox: "0 0 416 448", className: "icon-upload" },
                eln("path", {
                    d: "M320 368c0-8.75-7.25-16-16-16s-16 7.25-16 16 7.25 16 16 16 16-7.25 16-16zM384 368c0-8.75-7.25-16-16-16s-16 7.25-16 16 7.25 16 16 16 16-7.25 16-16zM416 312v80c0 13.25-10.75 24-24 24h-368c-13.25 0-24-10.75-24-24v-80c0-13.25 10.75-24 24-24h106.75c6.75 18.5 24.5 32 45.25 32h64c20.75 0 38.5-13.5 45.25-32h106.75c13.25 0 24 10.75 24 24zM334.75 150c-2.5 6-8.25 10-14.75 10h-64v112c0 8.75-7.25 16-16 16h-64c-8.75 0-16-7.25-16-16v-112h-64c-6.5 0-12.25-4-14.75-10-2.5-5.75-1.25-12.75 3.5-17.25l112-112c3-3.25 7.25-4.75 11.25-4.75s8.25 1.5 11.25 4.75l112 112c4.75 4.5 6 11.5 3.5 17.25z",
                })
            ),
            " Upload Background Image"
        ),
        el(
            "div",
            { className: "flex center column margin transWrap hidden" },
            el("div", {}, "Background Image Transparency"),
            el("input", { type: "range", id: "transparency", value: "0" })
        ),
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
            " Download Image"
        )
    );
}
