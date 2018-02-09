export const resetCanvas = (canvas: HTMLCanvasElement): void => {
  const [pWidth, pHeight] = [
    canvas.parentElement.offsetWidth,
    canvas.parentElement.offsetHeight,
  ];
  canvas.width = pWidth;
  canvas.height = pHeight;
};
