export function getRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

export function getProperColor(hexColor: string) {
    const hex = hexColor.replace("#", "");
    const red = Number.parseInt(hex.substring(0, 2), 16);
    const green = Number.parseInt(hex.substring(2, 4), 16);
    const blue = Number.parseInt(hex.substring(4, 6), 16);
    // Calculating Color Contrast: https://24ways.org/2010/calculating-color-contrast
    const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

    return 128 <= yiq ? "#000000" : "#ffffff";
}
