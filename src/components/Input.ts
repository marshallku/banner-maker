import crtElt from "crtelt";
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
    return crtElt(
        "div",
        {
            className: fcls("input", className),
        },
        crtElt(
            "span",
            {
                className: fcls(
                    "input__title",
                    subheading && "input__title--subheading"
                ),
            },
            title,
            subheading && crtElt("span", {}, subheading)
        ),
        crtElt("input", {
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
