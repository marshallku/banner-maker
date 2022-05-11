import el from "../utils/el";
import Input from "./Input";

export default function Resize() {
    return el(
        "div",
        { id: "resize", className: "flex center" },
        Input({ title: "Width", id: "width", type: "number", value: "700" }),
        Input({ title: "Height", id: "height", type: "number", value: "700" })
    );
}
