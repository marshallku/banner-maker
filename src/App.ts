import el from "./utils/el";
import DownloadButton from "./components/DownloadButton";
import Option from "./components/Option";
import Preview from "./components/Preview";

export default function App() {
    return el("fragment", {}, Preview(), Option(), DownloadButton());
}
