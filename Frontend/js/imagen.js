import {ImageUpdater} from "../content/Image.js";

const imageUpdater = new ImageUpdater(
    "http://localhost:3000/bucket/image/logo_aeis.png",
    ".logo_aeis"
);
imageUpdater.updateImage();