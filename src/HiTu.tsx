import * as React from 'react';
import { Shape } from './interface';
import { getTransform } from './utils/svgUtil';
import useFramer from './hooks/useFramer';

export interface HiTuProps {
  width: number;
  height: number;
  shapes?: Shape[];
  style?: React.CSSProperties;
  className?: string;
  debug?: boolean;
  frames?: number;
}

const HiTu: React.FC<HiTuProps> = ({
  style,
  className,
  width,
  height,
  frames = 0,
  shapes = [],
  debug,
}) => {
  const [frame, triggerMotion, getFrameInfo] = useFramer(frames);

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
        return (
          <g key={index} transform={getTransform(getFrameInfo(restShapeInfo))}>
            <Source />
          </g>
        );
      })}
    </svg>
  );
};

export default HiTu;
