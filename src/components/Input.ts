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
        { className: fcls("inputWrap", className) },
        el("span", {}, title),
        el("input", {
            id,
            type,
            value,
            events: {
                change: (event) => {
                    onChange?.(event);
                },
                keydown: (event) => {
                    onChange?.(event);
                },
                keyup: (event) => {
                    onChange?.(event);
                },
            },
        })
    );
}
