export default function getRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}
