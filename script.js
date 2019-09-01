const canvas = document.getElementById("preview"),
    pseudo = document.createElement("canvas"),
    pseudoCtx = pseudo.getContext("2d"),
    ctx = canvas.getContext("2d"),
    WIDTH = document.getElementById("width"),
    HEIGHT = document.getElementById("height"),
    TEXT = document.getElementById("text"),
    BG = document.getElementById("bgColor"),
    TEXTCOLOR = document.getElementById("textColor"),
    SIZE = document.getElementById("fontSize"),
    TRANS = document.getElementById("transparency"),
    img = new Image();

let input = 0, font = "sans-serif";

function init() {
    const rancolor = `#${(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}`;
    pseudo.width = WIDTH.value,
    pseudo.height = HEIGHT.value,
    BG.value = rancolor,
    ctx.fillStyle = rancolor,
    ctx.fillRect(0,0,canvas.width, canvas.height),
    ctx.textAlign = "center",
    ctx.font = `${SIZE.value}px ${font}`,
    ctx.textBaseline = "middle",
    ctx.maxWidth = canvas.width,
    ctx.fillStyle = "white",
    ctx.fillText("Sample Text", canvas.width/2, canvas.height/2),
    downloadBtn();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height),
    ctx.fillStyle = `#${BG.value}`,
    ctx.fillRect(0,0,canvas.width, canvas.height),
    ctx.drawImage(pseudo, 0, 0, canvas.width, canvas.height),
    ctx.textAlign = "center",
    ctx.font = `${SIZE.value}px ${font}`,
    ctx.textBaseline = "middle",
    ctx.maxWidth = canvas.width,
    ctx.fillStyle = `#${TEXTCOLOR.value}`,
    ctx.fillText(input === 0 ? "Sample Text" : TEXT.value, canvas.width/2, canvas.height/2),
    downloadBtn();
}

function downloadBtn() {
    const btn = document.getElementById("download");

    btn.href = canvas.toDataURL()
}

function fillImage(ctx, img) {
    const ratio = Math.max(pseudo.width / img.width, pseudo.height / img.height);

    ctx.clearRect(0, 0, pseudo.width, pseudo.height),
    ctx.drawImage(img, 0, 0, img.width, img.height, (pseudo.width - img.width * ratio) / 2, (pseudo.height - img.height * ratio) / 2, img.width * ratio, img.height * ratio)
}

function pseudoCanvas(e) {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]),
    reader.onload = e => {
        img.src = e.target.result,        
        img.onload = () => {
            TRANS.parentNode.classList.remove("hidden"),
            fillImage(pseudoCtx, img),
            pseudoCtx.globalAlpha = `${(100 - TRANS.value) / 100}`,
            render()
        }
    }
}

function pseudoRepaint() {
    fillImage(pseudoCtx, img),
    pseudoCtx.globalAlpha = `${(100 - TRANS.value) / 100}`,
    render()
}

function resize() {
    canvas.width = WIDTH.value,
    canvas.height = HEIGHT.value,
    pseudo.width = WIDTH.value,
    pseudo.height = HEIGHT.value,
    pseudoRepaint(),
    pseudoRepaint()
}

function dropdown(b) {
    const f = document.getElementById(b);
    f.classList.toggle("dropdown_reveal"),
    Array.from(document.querySelectorAll(".dropdown_reveal")).forEach(a => {
        if (a !== f) {
            a.classList.remove("dropdown_reveal")
        }
    })
}

init(),
WIDTH.addEventListener("change", () => {
    resize()
}),
WIDTH.addEventListener("keydown", () => {
    resize()
}),
WIDTH.addEventListener("keyup", () => {
    resize()
}),
HEIGHT.addEventListener("change", () => {
    resize()
}),
HEIGHT.addEventListener("keydown", () => {
    resize()
}),
HEIGHT.addEventListener("keyup", () => {
    resize()
}),
TEXT.addEventListener("change", () => {
    render(),
    input = 1
}),
TEXT.addEventListener("keydown", () => {
    render(),
    input = 1
}),
TEXT.addEventListener("keyup", () => {
    render(),
    input = 1
}),
BG.addEventListener("change", () => {
    render()
}),
BG.addEventListener("keydown", () => {
    render()
}),
BG.addEventListener("keyup", () => {
    render()
}),
TEXTCOLOR.addEventListener("change", () => {
    render()
}),
TEXTCOLOR.addEventListener("keydown", () => {
    render()
}),
TEXTCOLOR.addEventListener("keyup", () => {
    render()
}),
SIZE.addEventListener("change", () => {
    render()
}),
SIZE.addEventListener("keydown", () => {
    render()
}),
SIZE.addEventListener("keyup", () => {
    render()
}),
TRANS.addEventListener("change", () => {
    pseudoRepaint()
}),
TRANS.addEventListener("input", () => {
    pseudoRepaint()
}),
document.getElementById("bgImage").addEventListener("change", pseudoCanvas),
document.getElementById("fontList").addEventListener("click", e => {
    const target = e.target.dataset.font;

    document.getElementById("font").innerHTML = `${target}<i class="icon-angle-down"></i>`,
    font = target,
    render()
})
Array.from(document.querySelectorAll(".dropdown_btn")).forEach(a => {
    a.addEventListener("click", () => {
        dropdown(a.dataset.dropdown),
        a.classList.toggle("activated")
    })
}),
Array.from(document.querySelectorAll(".material-ripple")).forEach(a => {
    a.addEventListener("click", function (e) {
        const ripple = document.createElement("div"),
            rect = a.getBoundingClientRect();
        ripple.className = "animate",
        ripple.style.left = `${e.x - rect.left}px`,
        ripple.style.top = `${e.y - rect.top}px`,
        ripple.style.setProperty("--material-scale", a.offsetWidth),
        a.append(ripple),
        setTimeout(function () {
            ripple.parentNode.removeChild(ripple)
        }, 500)
    })
}),
window.addEventListener("click", e => {
    const target = e.target;
    if (!target.matches(".dropdown_btn, .dropdown_reveal, .dropdown_reveal *")) {
        Array.from(document.querySelectorAll(".dropdown_btn")).forEach(a => {
            a.classList.remove("activated")
        })
        Array.from(document.querySelectorAll(".dropdown_content")).forEach(a => {
            a.classList.remove("dropdown_reveal")
        });
    }
}),
window.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.remove("preload")
})