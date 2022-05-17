import { canvasStore } from "../store";
import el from "../utils/el";

export default function Preview() {
    const { setCanvas } = canvasStore;
    const canvas = el("canvas", {
        className: "canvas",
        width: canvasStore.width,
        height: canvasStore.height,
    });
    const ctx = canvas.getContext("2d");
    const render = () => {
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
            const { width: imageWidth, height: imageHeight } = backgroundImage;
            const ratio = Math.max(width / imageWidth, height / imageHeight);

            ctx.globalAlpha = backgroundOpacity;
            ctx.drawImage(
                backgroundImage,
                0,
                0,
                imageWidth,
                imageHeight,
                (width - imageWidth * ratio) / 2,
                (height - imageHeight * ratio) / 2,
                imageWidth * ratio,
                imageHeight * ratio
            );
            ctx.globalAlpha = 1;
        }

        ctx.textAlign = "center";
        ctx.font = `${fontSize}px ${font}`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontColor;

        const lines = text.split("\n");
        const lineHeight = fontSize * 1.5;
        const firstLineCoord =
            height / 2 - (0.5 * lines.length - 0.5) * lineHeight;

        lines.forEach((line, index) => {
            ctx.fillText(
                line,
                canvas.width / 2,
                firstLineCoord + index * lineHeight
            );
        });
    };

    canvasStore.addEventListener("update", render);
    render();
    setCanvas(canvas);

    return el("div", {}, canvas);
}
