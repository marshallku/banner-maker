import el from "./utils/el";
import DownloadButton from "./components/DownloadButton";
import Option from "./components/Option";
import Preview from "./components/Preview";
import Resize from "./components/Resize";

export default function App() {
    return el("fragment", {}, Resize(), Preview(), Option(), DownloadButton());
}
