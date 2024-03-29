import crtElt from "crtelt";
import fcls from "../utils/fcls";

export default function RippleButton({
    className,
    style,
    onClick,
    value,
}: RippleButtonProps) {
    return crtElt(
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

                    target.append(
                        crtElt("div", {
                            className: "material-ripple__animate",
                            style: {
                                left: `${event.x - rect.left}px`,
                                top: `${event.y - rect.top}px`,
                                "--material-scale": `${target.offsetWidth}`,
                            },
                            events: {
                                animationend({ target: animationTarget }) {
                                    if (
                                        !(
                                            animationTarget instanceof
                                            HTMLElement
                                        )
                                    ) {
                                        return;
                                    }

                                    animationTarget.remove();
                                },
                            },
                        })
                    );
                },
            },
        },
        value
    );
}
