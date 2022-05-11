interface CustomElements extends HTMLElementTagNameMap {
    fragment: DocumentFragment;
}

type CustomElementKeys = keyof CustomElements;

type CreatedElement<T extends CustomElementKeys> = CustomElements[T];

type CustomElementEventListener<T extends CustomElementKeys> = Pick<
    CreatedElement<T>,
    "addEventListener"
>;

type CustomElementEventListenerParameter<T extends CustomElementKeys> =
    Parameters<CreatedElement<T>["addEventListener"]>;

type CustomEvents<T extends CustomElementKeys> = {
    [key in CustomElementEventListenerParameter<T>[0]]:
        | CustomElementEventListenerParameter<T>[1]
        | [
              CustomElementEventListenerParameter<T>[1],
              CustomElementEventListenerParameter<T>[2]
          ];
};

interface CustomDataset {
    [key: string]: string;
}

interface CustomEventObject<T extends CustomElementKeys> {
    events: Partial<CustomEvents<T>>;
    dataset: CustomDataset;
}

type CustomElementAttributes<T extends CustomElementKeys> = Partial<
    CreatedElement<T>
> &
    Partial<CustomEventObject<T>>;

interface CustomSVGElements extends SVGElementTagNameMap {}

type CustomSVGElementKeys = keyof CustomSVGElements;

type CreatedSVGElement<T extends CustomSVGElementKeys> = CustomSVGElements[T];

type CustomSVGElementEventListener<T extends CustomSVGElementKeys> = Pick<
    CreatedSVGElement<T>,
    "addEventListener"
>;

type CustomSVGElementEventListenerParameter<T extends CustomSVGElementKeys> =
    Parameters<CreatedElement<T>["addEventListener"]>;

type CustomSVGEvents<T extends CustomSVGElementKeys> = {
    [key in CustomSVGElementEventListenerParameter<T>[0]]:
        | CustomSVGElementEventListenerParameter<T>[1]
        | [
              CustomSVGElementEventListenerParameter<T>[1],
              CustomSVGElementEventListenerParameter<T>[2]
          ];
};

interface CustomSVGEventObject<T extends CustomSVGElementKeys> {
    events: Partial<CustomSVGEvents<T>>;
}

interface CustomSVGElementInterface {
    [key: string]: string;
}

type CustomSVGElementAttributes<T extends CustomSVGElementKeys> =
    CustomSVGElementInterface & Partial<CustomSVGEventObject<T>>;
