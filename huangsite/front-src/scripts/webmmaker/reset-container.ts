import { sort } from "recursive-methods";
import { ScreenMode } from "../types/types";
export const resetContainer = (dom: HTMLElement): void => {
  const [scrnWidth, scrnHeight] = [window.innerWidth, window.innerHeight];
  let longerSideLength = 0;
  let shorterSideLength = 0;
  let screenMode: ScreenMode = "HORIZONTAL";
  if (scrnWidth < scrnHeight) {
    longerSideLength = scrnHeight;
    shorterSideLength = scrnWidth;
    screenMode = "VERTICAL";
  } else {
    longerSideLength = scrnWidth;
    shorterSideLength = scrnHeight;
    screenMode = "HORIZONTAL";
  }
  dom.style.width = String(longerSideLength) + "px";
  dom.style.height = String(shorterSideLength) + "px";
  if (screenMode === "VERTICAL") {
    alert("please set the screen landscape");
    // dom.style.transform = "rotateZ(90deg)";
  } else {
    dom.style.transform = "rotateZ(0deg)";
  }
};
