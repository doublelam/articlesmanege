import { CanvasDrawable } from "../../../../canvas-drawable/src/index";
const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const erase = document.getElementById("erase");
const draw = document.getElementById("draw");
const getImage = document.getElementById("getimage");
const clearAll = document.getElementById("clearall");
const getBlob = document.getElementById("getblob");
const drawable = new CanvasDrawable(canvas.getContext("2d"));
erase.onclick = e => {
  drawable.enerase();
};

draw.onclick = e => {
  drawable.endraw();
};
getImage.onclick = e => {
  console.log(drawable.getCanvasBase64());
};
clearAll.onclick = e => {
  drawable.cleanAll();
};
getBlob.onclick = e => {
  drawable.getCanvasBlob("image/webp", 1).then((blob: Blob) => {
    console.log(blob);
  });
};
