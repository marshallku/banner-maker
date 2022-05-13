import { canvasStore } from "../store";
import el, { eln } from "../utils/el";

export default function SelectFont() {
    const { font, setFont } = canvasStore;
    const CurrentFont = el("span", {}, font);
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
                style: {
                    fontFamily: text,
                },
                events: {
                    click() {
                        setFont(text);
                    },
                },
            },
            text
        );
    const DropdownContent = el(
        "ul",
        { id: "font-list", className: "dropdown__content" },
        ...fonts.map((x) => Button(x))
    );
    const DropdownButton = el(
        "div",
        {
            className: "dropdown__button",
            dataset: {
                dropdown: "font-list",
            },
            events: {
                click(event) {
                    const { target } = event;

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
        eln(
            "svg",
            { className: "icon", viewBox: "0 0 288 448" },
            eln("path", {
                d: "M268.75 184c0 2-1 4.25-2.5 5.75l-116.5 116.5c-1.5 1.5-3.75 2.5-5.75 2.5s-4.25-1-5.75-2.5l-116.5-116.5c-1.5-1.5-2.5-3.75-2.5-5.75s1-4.25 2.5-5.75l12.5-12.5c1.5-1.5 3.5-2.5 5.75-2.5 2 0 4.25 1 5.75 2.5l98.25 98.25 98.25-98.25c1.5-1.5 3.75-2.5 5.75-2.5s4.25 1 5.75 2.5l12.5 12.5c1.5 1.5 2.5 3.75 2.5 5.75z",
            })
        )
    );

    canvasStore.addEventListener("update", () => {
        CurrentFont.innerText = canvasStore.font;
    });

    window.addEventListener("click", (event) => {
        const target = <HTMLElement>event.target;

        if (
            !target.matches(
                ".dropdown__button, .dropdown__button *, .dropdown__content--reveal, .dropdown__content--reveal *"
            )
        ) {
            DropdownButton.classList.remove("dropdown__button--activated");
            DropdownContent.classList.remove("dropdown__content--reveal");
        }
    });

    return el(
        "div",
        { className: "input dropdown" },
        el("span", { className: "input__title" }, "Font"),
        DropdownButton,
        DropdownContent
    );
}
