import App from "./App";
import "./css/reset.css";
import "./css/font.css";
import "./css/style.css";

// TODO: Move everything below to dedicated components
function main() {
    document
        .querySelectorAll<HTMLElement>(".material-ripple")
        .forEach((element) => {
            element.addEventListener("click", (e) => {
                const ripple = document.createElement("div");
                const rect = element.getBoundingClientRect();

                ripple.className = "animate";
                ripple.style.left = `${e.x - rect.left}px`;
                ripple.style.top = `${e.y - rect.top}px`;
                ripple.style.setProperty(
                    "--material-scale",
                    `${element.offsetWidth}`
                );
                element.append(ripple);

                setTimeout(() => {
                    ripple.parentNode?.removeChild(ripple);
                }, 500);
            });
        });
}

document.getElementById("app")!.append(App());
main();
