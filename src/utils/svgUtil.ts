import { Shape, Info } from '../interface';

export function getTransform(info: Info) {
  const { scaleX, scaleY, rotate, x, y } = fillInfo(info);
  return `scale(${scaleX} ${scaleY}) translate(${x}, ${y}) rotate(${rotate})`;
}

export function fillInfo({
  x = 0,
  y = 0,
  scaleX = 1,
  scaleY = 1,
  rotate = 0,
  opacity = 1,
}: Info): Required<Info> {
  return { x, y, scaleX, scaleY, rotate, opacity };
}

export function getTransitionValue(start: number, end: number, ptg: number) {
  return start * (1 - ptg) + end * ptg;
}
