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

interface CustomEventObject<T extends CustomElementKeys> {
    events: Partial<CustomEvents<T>>;
}

type CustomElementAttributes<T extends CustomElementKeys> = Partial<
    CreatedElement<T>
> &
    Partial<CustomEventObject<T>>;
