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
        { id: "textWrap" },
        el("textarea", {
            id: "text",
            placeholder: "Type Here!",
            ariaLabel: "Type Here!",
            rows: 2,
            events: {
                change: handleChange,
                keydown: handleChange,
                keyup: handleChange,
            },
        }),
        el("div", { className: "line top" }),
        el("div", { className: "line" })
    );
}
