import el from "../utils/el";
import fcls from "../utils/fcls";

export default function Input({
    title,
    subheading,
    id,
    className,
    type = "text",
    value,
    onChange,
}: InputProps) {
    return el(
        "div",
        {
            className: fcls("input", className),
        },
        el(
            "span",
            {
                className: fcls(
                    "input__title",
                    subheading && "input__title--subheading"
                ),
            },
            title,
            subheading && el("span", {}, subheading)
        ),
        el("input", {
            id,
            type,
            value,
            events: {
                change(event) {
                    onChange?.(event);
                },
                input(event) {
                    onChange?.(event);
                },
            },
        })
    );
}
