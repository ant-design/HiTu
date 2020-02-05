import * as React from 'react';

export const TYPE_SHAPE = 'shape';
export const TYPE_SVG_TEXT = 'svgText';

export interface Info {
  x?: number;
  y?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
  originX?: number;
  originY?: number;
  opacity?: number;
}

export interface FrameInfo extends Info {
  frame: number;
  cubic?: [number, number, number, number];
}

interface BaseShape extends Info {
  /** Alias name for editor */
  name?: string;
  frames?: FrameInfo[];
}

interface ShapeShape extends BaseShape {
  type: typeof TYPE_SHAPE;
  source: React.ComponentType<any>;
}
interface SvgTextShape extends BaseShape {
  type: typeof TYPE_SVG_TEXT;
  source: string;
  chips?: { path: number[]; frames?: FrameInfo[] }[];
}

export type Shape = ShapeShape | SvgTextShape;

export type ShapeRender = (
  element: React.ReactElement,
  shape: Shape,
  frameInfo: Required<Info>,
) => React.ReactNode;
