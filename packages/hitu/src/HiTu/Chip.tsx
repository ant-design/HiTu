import * as React from 'react';
import { Info } from '../interface';

export interface ChipProps extends Required<Info> {
  debug?: boolean;
  width: number;
  height: number;
}

const Chip: React.FC<ChipProps> = ({
  debug,
  width,
  height,
  x,
  y,
  originX,
  originY,
  rotate,
  opacity,
  scaleX,
  scaleY,
  children,
}) => {
  const centerX = width * originX;
  const centerY = height * originY;

  return (
    <g
      transform={`translate(${x - centerX}, ${y - centerY})`}
      opacity={opacity}
    >
      {/* Center scale */}
      <g
        transform={`matrix(${scaleX}, 0, 0, ${scaleY}, ${centerX -
          scaleX * centerX}, ${centerY - scaleY * centerY})`}
      >
        {/* Center Rotate */}
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
          {children}
        </g>
      </g>
    </g>
  );
};

export default Chip;
