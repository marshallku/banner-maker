import crtElt from "crtelt";
import { canvasStore } from "../store";
import RippleButton from "./RippleButton";

export default function SelectFont() {
    const { font, setFont } = canvasStore;
    const CurrentFont = crtElt("span", {}, font);
    const fonts = [
        "sans-serif",
        "Noto Sans KR",
        "Nanum Gothic",
        "DungGeunMo",
        "BMJUA",
        "Black Han Sans",
        "ghanachoco",
        "Cafe24Ssurround",
        "EarlyFontDiary",
    ];
    const Button = (text: string) =>
        crtElt(
            "li",
            {},
            RippleButton({
                className: "font-list__item",
                style: { fontFamily: text },
                value: text,
                onClick: () => {
                    setFont(text);
                },
            })
        );

    const DropdownContent = crtElt(
        "ul",
        { className: "dropdown__content font-list" },
        ...fonts.map((x) => Button(x))
    );
    const DropdownButton = crtElt(
        "div",
        {
            className: "dropdown__button",
            events: {
                click({ target }) {
                    if (!(target instanceof HTMLElement)) {
                        return;
                    }

                    target.classList.toggle("dropdown__button--activated");
                    DropdownContent.classList.toggle(
                        "dropdown__content--reveal"
                    );
                },
            },
        },
        CurrentFont,
        crtElt(
            "svg",
            { className: "icon", viewBox: "0 0 288 448" },
            crtElt("path", {
                d: "M268.75 184c0 2-1 4.25-2.5 5.75l-116.5 116.5c-1.5 1.5-3.75 2.5-5.75 2.5s-4.25-1-5.75-2.5l-116.5-116.5c-1.5-1.5-2.5-3.75-2.5-5.75s1-4.25 2.5-5.75l12.5-12.5c1.5-1.5 3.5-2.5 5.75-2.5 2 0 4.25 1 5.75 2.5l98.25 98.25 98.25-98.25c1.5-1.5 3.75-2.5 5.75-2.5s4.25 1 5.75 2.5l12.5 12.5c1.5 1.5 2.5 3.75 2.5 5.75z",
            })
        )
    );

    canvasStore.addEventListener("update", () => {
        CurrentFont.innerText = canvasStore.font;
    });

    window.addEventListener("click", ({ target }) => {
        if (
            !(target instanceof HTMLElement) ||
            target.matches(
                ".dropdown__button, .dropdown__button *, .dropdown__content--reveal, .dropdown__content--reveal *"
            )
        ) {
            return;
        }

        DropdownButton.classList.remove("dropdown__button--activated");
        DropdownContent.classList.remove("dropdown__content--reveal");
    });

    return crtElt(
        "div",
        { className: "input dropdown" },
        crtElt("span", { className: "input__title" }, "Font"),
        DropdownButton,
        DropdownContent
    );
}
