import * as React from 'react';

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
}

export interface Shape extends Info {
  type: 'shape';
  source: React.ComponentType<any>;
  frames?: FrameInfo[];
}
