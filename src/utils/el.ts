export default function el<
    T extends CustomElementKeys,
    U extends CreatedElement<T>
>(
    nodeName: T,
    attributes: CustomElementAttributes<T> = {},
    ...children: Array<string | Element | undefined | null>
): U {
    const node =
        nodeName === "fragment"
            ? document.createDocumentFragment()
            : document.createElement(nodeName);

    children.forEach((childNode) => {
        if (!childNode) {
            return;
        }

        if (childNode instanceof Element) {
            node.appendChild(childNode);
            return;
        }

        node.appendChild(document.createTextNode(childNode));
    });

    if (node instanceof DocumentFragment) {
        return node as U;
    }

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === "events") {
            Object.entries(value as Partial<CustomEvents<T>>).forEach(
                ([type, args]) => {
                    if (Array.isArray(args)) {
                        const curArgs = args as [
                            EventListenerOrEventListenerObject,
                            boolean | AddEventListenerOptions | undefined
                        ];

                        node.addEventListener(type, ...curArgs);

                        return;
                    }

                    const curArgs = args as EventListenerOrEventListenerObject;

                    node.addEventListener(type, curArgs);
                }
            );

            return;
        }

        if (key === "dataset") {
            Object.entries(value as CustomDataset).forEach(
                ([dataAttribute, dataValue]) => {
                    node.dataset[dataAttribute] = dataValue;
                }
            );

            return;
        }

        if (key in node) {
            try {
                node[key as "innerText"] = value as string;
            } catch (error) {
                console.error(error);
                node.setAttribute(key, value as string);
            }
        } else {
            node.setAttribute(key, value as string);
        }
    });

    return node as U;
}

export function eln<
    T extends CustomSVGElementKeys,
    U extends CreatedSVGElement<T>
>(
    nodeName: T,
    attributes: CustomSVGElementAttributes<T> = {},
    ...children: Array<string | Element | undefined | null>
): U {
    const node = document.createElementNS(
        "http://www.w3.org/2000/svg",
        nodeName
    );

    children.forEach((childNode) => {
        if (!childNode) {
            return;
        }

        if (childNode instanceof Element) {
            node.appendChild(childNode);
            return;
        }

        node.appendChild(document.createTextNode(childNode));
    });

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === "events") {
            Object.entries(value as Partial<CustomSVGEvents<T>>).forEach(
                ([type, args]) => {
                    if (Array.isArray(args)) {
                        const curArgs = args as [
                            EventListenerOrEventListenerObject,
                            boolean | AddEventListenerOptions | undefined
                        ];

                        node.addEventListener(type, ...curArgs);

                        return;
                    }

                    const curArgs = args as EventListenerOrEventListenerObject;

                    node.addEventListener(type, curArgs);
                }
            );

            return;
        }

        if (key === "className") {
            node.classList.add(value);
        }

        node.setAttribute(key, value as string);
    });

    return node as U;
}
