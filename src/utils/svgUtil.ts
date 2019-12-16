import { Shape, Info, FrameInfo } from '../interface';
import CubicBezier from './cubicUtil';

export const DEFAULT_VALUES: Required<Info> = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  opacity: 1,
  originX: 0.5,
  originY: 0.5,
};
export const INFO_KEYS = Object.keys(DEFAULT_VALUES) as (keyof Info)[];

export function fillInfo(
  info: Info,
  { frames = [] }: { frames?: FrameInfo[] } = {},
): Required<Info> {
  const ret = { ...info } as Required<Info>;
  INFO_KEYS.forEach(key => {
    if (info[key] === undefined) {
      for (let i = frames.length - 1; i >= 0; i -= 1) {
        const frame = frames[i];
        const frameValue = frame[key];
        if (frameValue !== undefined) {
          ret[key] = frameValue;
          return;
        }
      }

      ret[key] = DEFAULT_VALUES[key];
    }
  });
  return ret;
}

export function getTransitionValue(
  start: number,
  end: number,
  ptg: number,
  cubic?: [number, number, number, number],
) {
  let ptgY = ptg;

  if (cubic) {
    const instance = new CubicBezier(...cubic);
    ptgY = instance.getTransition(ptg);
  }

  return start * (1 - ptgY) + end * ptgY;
}
