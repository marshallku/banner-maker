import { canvasStore } from "../store";
import el from "../utils/el";

export default function Preview() {
    const canvas = el("canvas", {
        id: "preview",
        width: canvasStore.width,
        height: canvasStore.height,
    });
    const ctx = canvas.getContext("2d");
    const render = async () => {
        const {
            width,
            height,
            text,
            font,
            fontSize,
            fontColor,
            backgroundColor,
            backgroundImage,
            backgroundOpacity,
        } = canvasStore;

        if (!ctx) {
            return;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        if (backgroundImage) {
            ctx.globalAlpha = backgroundOpacity;
            ctx.drawImage(backgroundImage, 0, 0, width, height);
            ctx.globalAlpha = 1;
        }

        ctx.textAlign = "center";
        ctx.font = `${fontSize}px ${font}`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontColor;

        const lines = text.split("\n");
        const lineHeight = fontSize * 1.5;
        const firstLineCord =
            height / 2 - (0.5 * lines.length - 0.5) * lineHeight;

        lines.forEach((line, index) => {
            ctx.fillText(
                line,
                canvas.width / 2,
                firstLineCord + index * lineHeight
            );
        });
    };

    canvasStore.addEventListener("update", render);
    render();

    return el("div", { className: "flex center" }, canvas);
}
