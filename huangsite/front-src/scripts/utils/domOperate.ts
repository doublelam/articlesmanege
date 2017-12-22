export const removeAll = (container: HTMLElement): HTMLElement => {
  if (!container.hasChildNodes()) {
    return container;
  }
  container.removeChild(container.firstChild);
  return removeAll(container);
}
