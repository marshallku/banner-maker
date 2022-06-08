import crtElt from "crtelt";
import DownloadButton from "./components/DownloadButton";
import Option from "./components/Option";
import Preview from "./components/Preview";

export default function App() {
    return crtElt(
        "fragment",
        {},
        crtElt("div", { className: "app__col" }, Preview()),
        crtElt("div", { className: "app__col" }, Option(), DownloadButton())
    );
}
