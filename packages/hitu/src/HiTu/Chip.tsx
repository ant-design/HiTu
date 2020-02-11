import * as React from 'react';
import { Info } from '../interface';
import SVGContext, { ChipManger } from '../SVG/context';

export interface ChipProps extends Required<Info> {
  debug?: boolean;
  frame: number;
  width: number;
  height: number;
  children: React.ReactElement;
  chips?: { path: number[] }[];
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
  chips,
  children,
  theme,
  ...rest
}) => {
  const centerX = width * originX;
  const centerY = height * originY;

  const chipManger = new ChipManger(chips);
  chipManger.setFrame(0);

  return (
    <SVGContext.Provider value={{ chipManger, theme }}>
      <g
        transform={`translate(${x - centerX}, ${y - centerY})`}
        opacity={opacity}
        {...rest}
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
    </SVGContext.Provider>
  );
};

export default Chip;
