export default function bindMethods(classToBind: any) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(classToBind)).map(
        (key) => {
            if (
                !(classToBind[key] instanceof Function) ||
                key === "constructor"
            ) {
                return;
            }

            classToBind[key] = classToBind[key].bind(classToBind);
        }
    );
}
