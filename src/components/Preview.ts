import el from "../utils/el";

export default function Preview() {
    return el(
        "div",
        { className: "flex center" },
        el("canvas", { id: "preview", width: 700, height: 700 })
    );
}
