import {ImageUpdater} from "../content/Image.js";

document.addEventListener('DOMContentLoaded', function () {
    const botonInicioElements = document.querySelectorAll('.boton_inicio');
    botonInicioElements.forEach(element => {
        element.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    });
});

const imageUpdater = new ImageUpdater(
    "http://localhost:3000/bucket/image/logo_aeis.png",
    ".logo_aeis"
);
imageUpdater.updateImage();