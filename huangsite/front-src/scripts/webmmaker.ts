/* require sass */
require("../styles/webmmaker.sass");

import { CanvasDrawable } from "canvas-drawable";
import { ele } from "./utils/getdom";
import { resetCanvas } from "./webmmaker/reset-canvas";
import { resetContainer } from "./webmmaker/reset-container";

class WebmMaker {
  private container: HTMLElement;
  private canvasEle: HTMLCanvasElement;
  private drawCanvas: CanvasDrawable;
  constructor() {
    this.getEles();
    this.onScreenModeChange();
    this.resetLayout();
  }

  public main(): void {
    this.initCanvas();
  }

  private initCanvas() {
    resetCanvas(this.canvasEle);
    this.drawCanvas = new CanvasDrawable(this.canvasEle.getContext("2d"));
    this.drawCanvas.endraw();
  }

  private resetLayout(): void {
    resetContainer(this.container);
  }

  private onScreenModeChange(): void {
    window.onresize = e => {
      this.resetLayout();
    };
  }

  private getEles(): void {
    this.container = ele("#container") as HTMLElement;
    this.canvasEle = ele("#canvas") as HTMLCanvasElement;
  }
}

const webmmaker = new WebmMaker();
webmmaker.main();
