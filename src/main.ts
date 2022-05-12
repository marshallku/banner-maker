import App from "./App";
import "./css/reset.css";
import "./css/font.css";
import "./css/style.css";

// TODO: Move everything below to dedicated components
function main() {
    function dropdown(id?: string) {
        if (!id) {
            return;
        }

        const target = <HTMLElement>document.getElementById(id);

        target.classList.toggle("dropdown_reveal");
        document.querySelectorAll(".dropdown_reveal").forEach((element) => {
            if (element !== target) {
                element.classList.remove("dropdown_reveal");
            }
        });
    }

    document
        .querySelectorAll<HTMLElement>(".dropdown_btn")
        .forEach((element) => {
            element.addEventListener("click", () => {
                dropdown(element.dataset.dropdown);
                element.classList.toggle("activated");
            });
        });

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

    window.addEventListener("click", (event) => {
        const target = <HTMLElement>event.target;

        if (
            !target.matches(
                ".dropdown_btn, .dropdown_reveal, .dropdown_reveal *"
            )
        ) {
            document.querySelectorAll(".dropdown_btn").forEach((element) => {
                element.classList.remove("activated");
            });
            document
                .querySelectorAll(".dropdown_content")
                .forEach((element) => {
                    element.classList.remove("dropdown_reveal");
                });
        }
    });

    window.addEventListener("DOMContentLoaded", () => {
        document.documentElement.classList.remove("preload");
    });
}

document.getElementById("app")!.append(App());
main();
