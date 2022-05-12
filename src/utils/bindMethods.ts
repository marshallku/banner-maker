export default function bindMethods(classToBind: any) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(classToBind))
        .filter(
            (key) =>
                key !== "constructor" && classToBind[key] instanceof Function
        )
        .forEach((key) => {
            classToBind[key] = classToBind[key].bind(classToBind);
        });
}
