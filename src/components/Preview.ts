import crtElt from "crtelt";
import { canvasStore } from "../store";

export default function Preview() {
    const { setCanvas } = canvasStore;
    const canvas = crtElt("canvas", {
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
            subheading,
            tag,
            font,
            fontSize,
            subheadingSize,
            tagSize,
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
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontColor;

        // Title
        const lines = text.split("\n");
        const lineHeight = fontSize * 1.5;
        const firstLineCoord =
            height / 2 - (0.5 * lines.length - 0.5) * lineHeight;

        ctx.font = `${fontSize}px ${font}`;
        lines.forEach((line, index) => {
            ctx.fillText(line, width / 2, firstLineCoord + index * lineHeight);
        });

        // Subheading
        ctx.font = `${subheadingSize}px ${font}`;
        ctx.fillText(
            subheading,
            width / 2,
            firstLineCoord + (lines.length - 1) * lineHeight + lineHeight / 2
        );

        // Tag
        ctx.font = `${tagSize}px ${font}`;
        ctx.fillText(tag, width / 2, height - 32);
    };

    canvasStore.addEventListener("update", render);
    render();
    setCanvas(canvas);

    return crtElt("div", {}, canvas);
}
