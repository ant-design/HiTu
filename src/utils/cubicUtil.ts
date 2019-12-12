export type CUBIC_NUMBER = [number, number, number, number];

export const EASE: CUBIC_NUMBER = [0.25, 0.1, 0.25, 1.0];

export default class CubicBezier {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  /**
   *
   * @param t Range of 0 ~ 1
   */
  getCoordinate(t: number) {
    const _t = 1 - t;
    const c1 = 3 * t * _t ** 2;
    const c2 = 3 * _t * t ** 2;
    const c3 = Math.pow(t, 3);
    const x = c1 * this.x1 + c2 * this.x2 + c3;
    const y = c1 * this.y1 + c2 * this.y2 + c3;
    return [x, y];
  }

  getTransition(targetX: number) {
    let start = [0, 0, 0];
    let end = [1, 1, 1];

    for (let i = 0; i < 10; i += 1) {
      const mid = (start[0] + end[0]) * 0.5;
      const [x, y] = this.getCoordinate(mid);
      if (targetX < x) {
        end = [mid, x, y];
      } else {
        start = [mid, x, y];
      }
    }

    const ptg = (targetX - start[1]) / (end[1] - start[1]);
    return start[2] + ptg * (end[2] - start[2]);
  }
}
