import el from "../utils/el";
import fcls from "../utils/fcls";

export default function Input({
    title,
    id,
    className,
    type = "text",
    value,
    onChange,
}: InputProps) {
    return el(
        "div",
        { className: fcls("input", className) },
        el("span", { className: "input__title" }, title),
        el("input", {
            id,
            type,
            value,
            events: {
                change: (event) => {
                    onChange?.(event);
                },
                input: (event) => {
                    onChange?.(event);
                },
            },
        })
    );
}
