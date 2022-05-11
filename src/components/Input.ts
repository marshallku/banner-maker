import el from "../utils/el";
import fcls from "../utils/fcls";

export default function Input({
    title,
    id,
    className,
    type = "text",
    value,
}: {
    title: string;
    id?: string;
    className?: string;
    type?: string;
    value?: string;
}) {
    return el(
        "div",
        { className: fcls("inputWrap", className) },
        el("span", {}, title),
        el("input", { id, type, value })
    );
}
