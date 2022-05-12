import { canvasStore } from "../store";
import el, { eln } from "../utils/el";

export default function SelectFont() {
    const { font, setFont } = canvasStore;
    const currentFont = el("span", {}, font);
    const fonts = [
        "sans-serif",
        "Noto Sans KR",
        "Nanum Gothic",
        "DungGeunMo",
        "BMJUA",
        "Black Han Sans",
        "ghanachoco",
    ];
    const Button = (text: string) =>
        el(
            "li",
            {
                className: "material-ripple",
                events: {
                    click() {
                        setFont(text);
                    },
                },
            },
            text
        );

    canvasStore.addEventListener("update", () => {
        currentFont.innerText = canvasStore.font;
    });

    return el(
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
            currentFont,
            eln(
                "svg",
                { className: "icon-angle-down", viewBox: "0 0 288 448" },
                eln("path", {
                    d: "M268.75 184c0 2-1 4.25-2.5 5.75l-116.5 116.5c-1.5 1.5-3.75 2.5-5.75 2.5s-4.25-1-5.75-2.5l-116.5-116.5c-1.5-1.5-2.5-3.75-2.5-5.75s1-4.25 2.5-5.75l12.5-12.5c1.5-1.5 3.5-2.5 5.75-2.5 2 0 4.25 1 5.75 2.5l98.25 98.25 98.25-98.25c1.5-1.5 3.75-2.5 5.75-2.5s4.25 1 5.75 2.5l12.5 12.5c1.5 1.5 2.5 3.75 2.5 5.75z",
                })
            )
        ),
        el(
            "ul",
            { id: "fontList", className: "dropdown_content" },
            ...fonts.map((x) => Button(x))
        )
    );
}