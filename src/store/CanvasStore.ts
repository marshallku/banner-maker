import bindMethods from "../utils/bindMethods";
import getRandomColor from "../utils/getRandomColor";

export default class CanvasStore extends EventTarget {
    canvas?: HTMLCanvasElement;
    width: number;
    height: number;
    text: string;
    font: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    backgroundImage?: HTMLImageElement;
    backgroundOpacity: number;

    constructor() {
        const defaultSize = +import.meta.env.VITE_CANVAS_SIZE;

        super();
        this.width = defaultSize;
        this.height = defaultSize;
        this.text = "Sample Text";
        this.font = "sans-serif";
        this.fontSize = 64;
        this.fontColor = "#ffffff";
        this.backgroundColor = getRandomColor();
        this.backgroundOpacity = 0.5;
        bindMethods(this);
    }

    #update() {
        this.dispatchEvent(new CustomEvent("update"));
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    setWidth(width: number) {
        this.width = width;
        this.#update();
    }

    setHeight(height: number) {
        this.height = height;
        this.#update();
    }

    setText(text: string) {
        this.text = text === "" ? "Sample Text" : text;
        this.#update();
    }

    setFont(font: string) {
        this.font = font;
        this.#update();
    }

    setFontSize(fontSize: number) {
        this.fontSize = fontSize;
        this.#update();
    }

    setFontColor(fontColor: string) {
        this.fontColor = fontColor;
        this.#update();
    }

    setBackgroundColor(backgroundColor: string) {
        this.backgroundColor = backgroundColor;
        this.#update();
    }

    setBackgroundImage(backgroundImage: File) {
        const reader = new FileReader();
        const img = document.createElement("img");

        reader.readAsDataURL(backgroundImage);
        reader.addEventListener("load", ({ target }) => {
            if (!target) {
                return;
            }

            const { result } = target;

            if (!result || typeof result !== "string") {
                return;
            }

            img.src = result;
            img.addEventListener("load", () => {
                this.backgroundImage = img;
                this.#update();
            });
        });
    }

    setBackgroundOpacity(backgroundOpacity: number) {
        this.backgroundOpacity = backgroundOpacity;
        this.#update();
    }
}
