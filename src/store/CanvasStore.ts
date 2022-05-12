import getRandomColor from "../utils/getRandomColor";

export default class CanvasStore extends EventTarget {
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
        this.setWidth = this.setWidth.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.setText = this.setText.bind(this);
        this.setFont = this.setFont.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setFontColor = this.setFontColor.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.setBackgroundOpacity = this.setBackgroundOpacity.bind(this);
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
            img.addEventListener("load", () => {
                this.backgroundImage = img;
                this.#update();
            });
        });
    }

    setBackgroundOpacity(backgroundOpacity: number) {
        this.backgroundOpacity = backgroundOpacity;
        console.log(backgroundOpacity);
        this.#update();
    }
}
