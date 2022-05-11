import App from "./App";
import "./css/style.css";

// TODO: Move everything below to dedicated components
function main() {
    const canvas = <HTMLCanvasElement>document.getElementById("preview");
    const pseudo = document.createElement("canvas");
    const pseudoCtx = <CanvasRenderingContext2D>pseudo.getContext("2d");
    const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    const WIDTH = <HTMLInputElement>document.getElementById("width");
    const HEIGHT = <HTMLInputElement>document.getElementById("height");
    const TEXT = <HTMLTextAreaElement>document.getElementById("text");
    const BG = <HTMLInputElement>document.getElementById("bgColor");
    const TEXTCOLOR = <HTMLInputElement>document.getElementById("textColor");
    const SIZE = <HTMLInputElement>document.getElementById("fontSize");
    const TRANS = <HTMLInputElement>document.getElementById("transparency");
    const img = new Image();

    let input = false;
    let font = "sans-serif";

    function init() {
        const rancolor = `#${(0x1000000 + Math.random() * 0xffffff)
            .toString(16)
            .substr(1, 6)}`;

        pseudo.width = +WIDTH.value;
        pseudo.height = +HEIGHT.value;
        BG.value = rancolor;
        ctx.fillStyle = rancolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.font = `${SIZE.value}px ${font}`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Sample Text", canvas.width / 2, canvas.height / 2);
        downloadBtn();
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BG.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(pseudo, 0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.font = `${SIZE.value}px ${font}`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = TEXTCOLOR.value;
        if (!input) {
            ctx.fillText("Sample Text", canvas.width / 2, canvas.height / 2);
        } else {
            const lines = TEXT.value.split("\n");
            const lineHeight = +SIZE.value * 1.5;
            const firstLineCord =
                canvas.height / 2 - (0.5 * lines.length - 0.5) * lineHeight;

            lines.forEach((line, index) => {
                ctx.fillText(
                    line,
                    canvas.width / 2,
                    firstLineCord + index * lineHeight
                );
            });
        }

        downloadBtn();
    }

    function handleChange() {
        input = !!TEXT.value;

        const { scrollY } = window;
        TEXT.style.height = "auto";
        TEXT.style.height = `calc(${TEXT.scrollHeight}px + 1rem)`;
        window.scrollTo(0, scrollY);

        render();
    }

    function downloadBtn() {
        const btn = <HTMLAnchorElement>document.getElementById("download");

        btn.href = canvas.toDataURL();
        btn.download = `${TEXT.value}`;
    }

    function fillImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
        const ratio = Math.max(
            pseudo.width / img.width,
            pseudo.height / img.height
        );

        ctx.clearRect(0, 0, pseudo.width, pseudo.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            (pseudo.width - img.width * ratio) / 2,
            (pseudo.height - img.height * ratio) / 2,
            img.width * ratio,
            img.height * ratio
        );
    }

    function pseudoCanvas(event: Event) {
        const reader = new FileReader();
        const { target } = event;

        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        const { files } = target;

        if (!files) {
            return;
        }

        reader.readAsDataURL(files[0]);
        reader.addEventListener("load", (event) => {
            const { target } = event;

            if (!target) {
                return;
            }

            const { result } = target;

            if (!result || typeof result !== "string") {
                return;
            }

            img.src = result;
            img.onload = () => {
                (<HTMLDivElement>TRANS.parentNode).classList.remove("hidden");
                fillImage(pseudoCtx, img);
                pseudoCtx.globalAlpha = (100 - +TRANS.value) / 100;
                render();
            };
        });
    }

    function pseudoRepaint() {
        fillImage(pseudoCtx, img);
        pseudoCtx.globalAlpha = (100 - +TRANS.value) / 100;
        render();
    }

    function resize() {
        canvas.width = +WIDTH.value;
        canvas.height = +HEIGHT.value;
        pseudo.width = +WIDTH.value;
        pseudo.height = +HEIGHT.value;
        pseudoRepaint();
    }

    function dropdown(id?: string) {
        if (!id) {
            return;
        }

        const target = <HTMLElement>document.getElementById(id);

        target.classList.toggle("dropdown_reveal");
        document.querySelectorAll(".dropdown_reveal").forEach((element) => {
            if (element !== target) {
                element.classList.remove("dropdown_reveal");
            }
        });
    }

    init();

    WIDTH.addEventListener("change", resize);
    WIDTH.addEventListener("keydown", resize);
    WIDTH.addEventListener("keyup", resize);
    HEIGHT.addEventListener("change", resize);
    HEIGHT.addEventListener("keydown", resize);
    HEIGHT.addEventListener("keyup", resize);
    TEXT.addEventListener("change", handleChange);
    TEXT.addEventListener("keydown", handleChange);
    TEXT.addEventListener("keyup", handleChange);
    BG.addEventListener("change", render);
    BG.addEventListener("keydown", render);
    BG.addEventListener("keyup", render);
    TEXTCOLOR.addEventListener("change", render);
    SIZE.addEventListener("change", render);
    TRANS.addEventListener("change", pseudoRepaint);
    TRANS.addEventListener("input", pseudoRepaint);
    document
        .getElementById("bgImage")
        ?.addEventListener("change", pseudoCanvas);

    document.getElementById("fontList")?.addEventListener("click", (event) => {
        const target = (<HTMLElement>event.target).dataset.font;

        if (!target) {
            return;
        }

        document.getElementById(
            "font"
        )!.innerHTML = `${target}<i class="icon-angle-down"></i>`;
        font = target;
        render();
    });

    document
        .querySelectorAll<HTMLElement>(".dropdown_btn")
        .forEach((element) => {
            element.addEventListener("click", () => {
                dropdown(element.dataset.dropdown);
                element.classList.toggle("activated");
            });
        });

    document
        .querySelectorAll<HTMLElement>(".material-ripple")
        .forEach((element) => {
            element.addEventListener("click", (e) => {
                const ripple = document.createElement("div");
                const rect = element.getBoundingClientRect();

                ripple.className = "animate";
                ripple.style.left = `${e.x - rect.left}px`;
                ripple.style.top = `${e.y - rect.top}px`;
                ripple.style.setProperty(
                    "--material-scale",
                    `${element.offsetWidth}`
                );
                element.append(ripple);

                setTimeout(() => {
                    ripple.parentNode?.removeChild(ripple);
                }, 500);
            });
        });

    window.addEventListener("click", (event) => {
        const target = <HTMLElement>event.target;

        if (
            !target.matches(
                ".dropdown_btn, .dropdown_reveal, .dropdown_reveal *"
            )
        ) {
            document.querySelectorAll(".dropdown_btn").forEach((element) => {
                element.classList.remove("activated");
            });
            document
                .querySelectorAll(".dropdown_content")
                .forEach((element) => {
                    element.classList.remove("dropdown_reveal");
                });
        }
    });

    window.addEventListener("DOMContentLoaded", () => {
        document.documentElement.classList.remove("preload");
    });
}

document.getElementById("app")!.append(App());
main();
