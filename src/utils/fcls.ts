export default function fcls(...classNames: unknown[]) {
    return classNames.filter((x) => !!x).join(" ");
}
