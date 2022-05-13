import el from "../utils/el";
import fcls from "../utils/fcls";

export default function RippleButton({
    className,
    style,
    onClick,
    value,
}: {
    className?: string;
    style: Partial<CSSStyleDeclaration>;
    onClick: () => void;
    value: string;
}) {
    return el(
        "button",
        {
            className: fcls("material-ripple", className),
            style,
            events: {
                click(event) {
                    onClick();
                    const { target } = event;

                    if (
                        !(event instanceof MouseEvent) ||
                        !(target instanceof HTMLElement)
                    ) {
                        return;
                    }

                    const rect = target.getBoundingClientRect();
                    const ripple = el("div", {
                        className: "material-ripple__animate",
                        style: {
                            left: `${event.x - rect.left}px`,
                            top: `${event.y - rect.top}px`,
                        },
                        events: {
                            animationend({ target: animationTarget }) {
                                if (!(animationTarget instanceof HTMLElement)) {
                                    return;
                                }

                                animationTarget.remove();
                            },
                        },
                    });

                    ripple.style.setProperty(
                        "--material-scale",
                        `${target.offsetWidth}`
                    );
                    target.append(ripple);
                },
            },
        },
        value
    );
}
