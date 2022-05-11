import Option from "./components/Option";
import Preview from "./components/Preview";
import Resize from "./components/Resize";
import el from "./utils/el";

export default function App() {
    return el("fragment", {}, Resize(), Preview(), Option());
}
