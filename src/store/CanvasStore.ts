import bindMethods from "../utils/bindMethods";
import { getProperColor, getRandomColor } from "../utils/getColor";

export default class CanvasStore extends EventTarget {
    canvas?: HTMLCanvasElement;
    width: number;
    height: number;
    text: string;
    subheading: string;
    tag: string;
    font: string;
    fontSize: number;
    subheadingSize: number;
    tagSize: number;
    fontColor: string;
    backgroundColor: string;
    backgroundImage?: HTMLImageElement;
    backgroundOpacity: number;

    constructor() {
        const backgroundColor = getRandomColor();
        const fontColor = getProperColor(backgroundColor);

        super();
        this.width = 700;
        this.height = 700;
        this.text = "Sample Text";
        this.subheading = "";
        this.tag = "";
        this.font = "sans-serif";
        this.fontSize = 64;
        this.subheadingSize = 32;
        this.tagSize = 32;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
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

    setSubheading(subheading: string) {
        this.subheading = subheading;
        this.#update();
    }

    setTag(tag: string) {
        this.tag = tag;
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

    setSubheadingSize(subheadingSize: number) {
        this.subheadingSize = subheadingSize;
        this.#update();
    }

    setTagSize(tagSize: number) {
        this.tagSize = tagSize;
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

        reader.readAsDataURL(backgroundImage);
        reader.addEventListener("load", ({ target }) => {
            if (!target) {
                return;
            }

            const { result } = target;

            if (!result || typeof result !== "string") {
                return;
            }

            const img = document.createElement("img");

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
