import { canvasStore } from "../store";
import el, { eln } from "../utils/el";

export default function SelectImage() {
    const { backgroundOpacity, setBackgroundImage, setBackgroundOpacity } =
        canvasStore;
    const opacityMax = 100;
    const convertTransparencyToOpacity = (transparency: number) =>
        (opacityMax - transparency) / opacityMax;
    const OpacityInput = el(
        "div",
        { className: "input input--opacity input--hidden" },
        el("span", { className: "input__title" }, "Image Opacity"),
        el("input", {
            type: "range",
            value: `${backgroundOpacity * opacityMax}`,
            min: "0",
            max: `${opacityMax}`,
            events: {
                change({ target }) {
                    if (!(target instanceof HTMLInputElement)) {
                        return;
                    }

                    setBackgroundOpacity(
                        convertTransparencyToOpacity(target.valueAsNumber)
                    );
                },
                input({ target }) {
                    if (!(target instanceof HTMLInputElement)) {
                        return;
                    }

                    setBackgroundOpacity(
                        convertTransparencyToOpacity(target.valueAsNumber)
                    );
                },
            },
        })
    );

    return el(
        "fragment",
        {},
        el("input", {
            type: "file",
            id: "background-image",
            hidden: true,
            events: {
                change({ target }) {
                    if (
                        !(target instanceof HTMLInputElement) ||
                        !target.files
                    ) {
                        return;
                    }

                    const file = target.files[0];

                    setBackgroundImage(file);
                    OpacityInput.classList.remove("input--hidden");
                },
            },
        }),
        el(
            "label",
            {
                htmlFor: "background-image",
                className: "button option__input",
            },
            eln(
                "svg",
                { viewBox: "0 0 416 448", className: "icon" },
                eln("path", {
                    d: "M320 368c0-8.75-7.25-16-16-16s-16 7.25-16 16 7.25 16 16 16 16-7.25 16-16zM384 368c0-8.75-7.25-16-16-16s-16 7.25-16 16 7.25 16 16 16 16-7.25 16-16zM416 312v80c0 13.25-10.75 24-24 24h-368c-13.25 0-24-10.75-24-24v-80c0-13.25 10.75-24 24-24h106.75c6.75 18.5 24.5 32 45.25 32h64c20.75 0 38.5-13.5 45.25-32h106.75c13.25 0 24 10.75 24 24zM334.75 150c-2.5 6-8.25 10-14.75 10h-64v112c0 8.75-7.25 16-16 16h-64c-8.75 0-16-7.25-16-16v-112h-64c-6.5 0-12.25-4-14.75-10-2.5-5.75-1.25-12.75 3.5-17.25l112-112c3-3.25 7.25-4.75 11.25-4.75s8.25 1.5 11.25 4.75l112 112c4.75 4.5 6 11.5 3.5 17.25z",
                })
            ),
            "Upload Background Image"
        ),
        OpacityInput
    );
}
