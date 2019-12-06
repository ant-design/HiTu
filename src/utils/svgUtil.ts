import { Shape, Info } from '../interface';

export function getTransform(info: Info, originX: number, originY: number) {
  const { scaleX, scaleY, rotate, x, y } = fillInfo(info);
  originX = Number.isNaN(originX) ? 0 : originX;
  originY = Number.isNaN(originY) ? 0 : originY;

  return `
  translate(${originX}, ${originY})
  scale(${scaleX} ${scaleY})
  rotate(${rotate})
  translate(${-originX}, ${-originY})
  translate(${x}, ${y})
  `;
}

export function fillInfo({
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
  opacity = 1,
  originX = 0.5,
  originY = 0.5,
}: Info): Required<Info> {
  return { x, y, scaleX, scaleY, rotate, opacity, originX, originY };
}

export function getTransitionValue(start: number, end: number, ptg: number) {
  return start * (1 - ptg) + end * ptg;
}
