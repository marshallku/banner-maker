export default class CanvasStore extends EventTarget {
    width: number;
    height: number;
    text: string;
    font: string;

    constructor() {
        const defaultSize = +import.meta.env.VITE_CANVAS_SIZE;

        super();
        this.width = defaultSize;
        this.height = defaultSize;
        this.text = "Sample Text";
        this.font = "sans-serif";
    }

    #update() {
        this.dispatchEvent(new CustomEvent("update"));
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
}
