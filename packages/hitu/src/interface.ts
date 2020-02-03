import * as React from 'react';

export const TYPE_SHAPE = 'shape';

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

export interface Shape extends Info {
  type: typeof TYPE_SHAPE;
  /** Alias name for editor */
  name?: string;
  source: React.ComponentType<any>;
  frames?: FrameInfo[];
}

export type ShapeRender = (
  element: React.ReactElement,
  shape: Shape,
  frameInfo: Required<Info>,
) => React.ReactNode;
