import el from "../utils/el";
import fcls from "../utils/fcls";

export default function Input({
    title,
    id,
    className,
    type = "text",
    value,
}: InputProps) {
    return el(
        "div",
        { className: fcls("inputWrap", className) },
        el("span", {}, title),
        el("input", { id, type, value })
    );
}
