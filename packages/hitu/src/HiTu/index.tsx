import * as React from 'react';
import { Shape, TYPE_SHAPE, ShapeRender } from '../interface';
import SVG from '../SVG';
import useFramer, { FramerInfo } from '../hooks/useFramer';
import {
  EASE,
  CUBIC_NUMBER,
  EASE_IN,
  EASE_IN_OUT,
  EASE_OUT,
} from '../utils/cubicUtil';
import Chip from './Chip';

export interface HiTuRefObject {
  triggerMotion: (play?: boolean) => void;
  getFramerInfo: () => FramerInfo;
  setFrame: (frame: number) => void;
}

export interface HiTuProps {
  width: number;
  height: number;
  shapes?: Shape[];
  style?: React.CSSProperties;
  className?: string;
  debug?: boolean;
  frames?: number;
  defaultPlay?: boolean;
  defaultFrame?: number;
  loop?: boolean;
  shapeRender?: ShapeRender;
  onPlay?: (play: boolean) => void;
  onFrame?: (frame: number) => void;
}

const InternalHiTu: React.RefForwardingComponent<HiTuRefObject, HiTuProps> = (
  {
    style,
    className,
    width,
    height,
    frames = 0,
    shapes = [],
    debug,
    defaultPlay,
    defaultFrame,
    loop,
    shapeRender,
    onPlay,
    onFrame,
  },
  ref,
) => {
  const { triggerMotion, getFrameInfo, getFramerInfo, setFrame } = useFramer(
    frames,
    {
      defaultPlay,
      defaultFrame,
      onPlay,
      onFrame,
      loop,
    },
  );

  React.useImperativeHandle(ref, () => ({
    triggerMotion,
    getFramerInfo,
    setFrame,
  }));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} style={style}>
      {debug && (
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          stroke="blue"
          fill="transparent"
        />
      )}
      {shapes.map((shape, index) => {
        const { type, source: Source, ...restShapeInfo } = shape;
        let shapeWidth: number = 0;
        let shapeHeight: number = 0;

        const frameInfo = getFrameInfo(restShapeInfo);

        let shapeEle: React.ReactElement | null = null;
        switch (type) {
          case 'shape':
            ({ width: shapeWidth, height: shapeHeight } = Source as any);
            shapeEle = <Source />;
            break;

          case 'svgText':
            // TODO: Performance improvement
            shapeEle = SVG.parse(Source as string);
            ({ width: shapeWidth, height: shapeHeight } = shapeEle.props);

            console.log('->>', shapeEle);
            break;
        }

        const shapeHolder = (
          // Position & Opacity
          <Chip {...frameInfo} width={shapeWidth} height={shapeHeight}>
            {shapeEle}
          </Chip>
        );

        if (shapeRender) {
          return shapeRender(shapeHolder, shape, frameInfo);
        }

        return shapeHolder;
      })}
    </svg>
  );
};

const HiTu = React.forwardRef(InternalHiTu);

export type HiTu = typeof HiTu & {
  TYPE_SHAPE: typeof TYPE_SHAPE;
  CUBIC_EASE: CUBIC_NUMBER;
  CUBIC_EASE_IN: CUBIC_NUMBER;
  CUBIC_EASE_IN_OUT: CUBIC_NUMBER;
  CUBIC_EASE_OUT: CUBIC_NUMBER;
};

const ExportHiTu = HiTu as HiTu;
ExportHiTu.TYPE_SHAPE = TYPE_SHAPE;
ExportHiTu.CUBIC_EASE = EASE;
ExportHiTu.CUBIC_EASE_IN = EASE_IN;
ExportHiTu.CUBIC_EASE_IN_OUT = EASE_IN_OUT;
ExportHiTu.CUBIC_EASE_OUT = EASE_OUT;

export default ExportHiTu;
