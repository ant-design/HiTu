import * as React from 'react';
import { Shape, TYPE_SHAPE } from './interface';
import useFramer, { FramerInfo } from './hooks/useFramer';
import {
  EASE,
  CUBIC_NUMBER,
  EASE_IN,
  EASE_IN_OUT,
  EASE_OUT,
} from './utils/cubicUtil';

export interface HiTuRefObject {
  triggerMotion: (play?: boolean) => void;
  getFramerInfo: () => FramerInfo;
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
  loop?: boolean;
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
    loop,
    onPlay,
    onFrame,
  },
  ref,
) => {
  const [frame, triggerMotion, getFrameInfo, getFramerInfo] = useFramer(
    frames,
    {
      defaultPlay,
      onPlay,
      onFrame,
      loop,
    },
  );

  React.useImperativeHandle(ref, () => ({
    triggerMotion,
    getFramerInfo,
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
      {shapes.map(({ source: Source, ...restShapeInfo }, index) => {
        const { width = 0, height = 0 } = Source as any;
        const {
          x,
          y,
          originX,
          originY,
          scaleX,
          scaleY,
          rotate,
          opacity,
        } = getFrameInfo(restShapeInfo);
        const centerX = width * originX;
        const centerY = height * originY;

        return (
          <g
            key={index}
            transform={`translate(${x - centerX}, ${y - centerY})`}
            opacity={opacity}
          >
            <g
              transform={`matrix(${scaleX}, 0, 0, ${scaleY}, ${centerX -
                scaleX * centerX}, ${centerY - scaleY * centerY})`}
            >
              <g transform={`rotate(${rotate}, ${centerX}, ${centerY})`}>
                {debug && (
                  <rect
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    stroke="red"
                    fill="transparent"
                  />
                )}
                <Source />
              </g>
            </g>
          </g>
        );
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
