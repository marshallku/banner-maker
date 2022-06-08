import crtElt from "crtelt";
import { canvasStore } from "../store";

export default function Textarea() {
    const { setText, setSubheading, setTag } = canvasStore;

    return crtElt(
        "fragment",
        {},
        crtElt(
            "div",
            { className: "text" },
            crtElt(
                "label",
                { className: "text__label" },
                crtElt("span", { className: "text__title" }, "Title"),
                crtElt("textarea", {
                    className: "text__input",
                    placeholder: "Type Here!",
                    ariaLabel: "Type Here!",
                    rows: 2,
                    events: {
                        input({ target }) {
                            if (!(target instanceof HTMLTextAreaElement)) {
                                return;
                            }

                            setText(target.value);
                        },
                    },
                })
            )
        ),
        crtElt(
            "div",
            { className: "text" },
            crtElt(
                "label",
                { className: "text__label" },
                crtElt("span", { className: "text__title" }, "Subheading"),
                crtElt("input", {
                    className: "text__input",
                    placeholder: "Type Here!",
                    ariaLabel: "Type Here!",
                    events: {
                        input({ target }) {
                            if (!(target instanceof HTMLInputElement)) {
                                return;
                            }

                            setSubheading(target.value);
                        },
                    },
                })
            )
        ),
        crtElt(
            "div",
            { className: "text" },
            crtElt(
                "label",
                { className: "text__label" },
                crtElt("span", { className: "text__title" }, "Tag"),
                crtElt("input", {
                    className: "text__input",
                    placeholder: "Type Here!",
                    ariaLabel: "Type Here!",
                    events: {
                        input({ target }) {
                            if (!(target instanceof HTMLInputElement)) {
                                return;
                            }

                            setTag(target.value);
                        },
                    },
                })
            )
        )
    );
}
