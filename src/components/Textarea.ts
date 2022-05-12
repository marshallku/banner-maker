import { canvasStore } from "../store";
import el from "../utils/el";

export default function Textarea() {
    const { setText } = canvasStore;
    const handleChange = (event: Event) => {
        const { target } = event;

        if (!(target instanceof HTMLTextAreaElement)) {
            return;
        }

        setText(target.value);
    };

    return el(
        "div",
        { className: "text" },
        el("textarea", {
            className: "text__input",
            placeholder: "Type Here!",
            ariaLabel: "Type Here!",
            rows: 2,
            events: {
                change: handleChange,
                keydown: handleChange,
                keyup: handleChange,
            },
        }),
        el("div", { className: "text__line text__line--top" }),
        el("div", { className: "text__line" })
    );
}
