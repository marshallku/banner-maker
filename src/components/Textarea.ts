import { canvasStore } from "../store";
import el from "../utils/el";

export default function Textarea() {
    const { setText, setSubheading, setTag } = canvasStore;

    return el(
        "fragment",
        {},
        el(
            "div",
            { className: "text" },
            el(
                "label",
                { className: "text__label" },
                el("span", { className: "text__title" }, "Title"),
                el("textarea", {
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
        el(
            "div",
            { className: "text" },
            el(
                "label",
                { className: "text__label" },
                el("span", { className: "text__title" }, "Subheading"),
                el("input", {
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
        el(
            "div",
            { className: "text" },
            el(
                "label",
                { className: "text__label" },
                el("span", { className: "text__title" }, "Tag"),
                el("input", {
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
