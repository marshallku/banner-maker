import { canvasStore } from "../store";
import el from "../utils/el";

export default function Textarea() {
    const { setText } = canvasStore;

    return el(
        "div",
        { className: "text" },
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
        }),
        el("div", { className: "text__line text__line--top" }),
        el("div", { className: "text__line" })
    );
}
