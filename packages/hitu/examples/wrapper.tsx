/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import {
  Common_Primary_Plant01,
  Common_Primary_BarChart02,
  Background_Primary_Atom,
} from '@ant-design/hitu-assets';
import HiTu from '../src';

const Demo = () => {
  const [selectName, setSelectName] = React.useState<string>('');

  return (
    <div>
      <HiTu
        width={1000}
        height={500}
        style={{ border: '1px solid red', width: 1000, height: 500 }}
        shapes={[
          {
            type: 'shape',
            source: Common_Primary_Plant01,
            scaleX: 0.2,
            scaleY: 0.2,
            x: 200,
            y: 150,
            name: 'plant',
          },
          {
            type: 'shape',
            source: Common_Primary_BarChart02,
            scaleX: 0.2,
            scaleY: 0.2,
            rotate: 30,
            x: 500,
            y: 200,
            name: 'chart',
          },
          {
            type: 'shape',
            source: Background_Primary_Atom,
            scaleX: 0.1,
            scaleY: 0.1,
            opacity: 0.5,
            x: 800,
            y: 400,
            name: 'atom',
          },
        ]}
        shapeRender={(element, shape, frameInfo) => {
          const clone = React.cloneElement(element, {
            style: {
              cursor: 'pointer',
            },
            onClick: () => {
              setSelectName(shape.name!);
            },
          });

          let selectionEle: React.ReactElement | null = null;
          if (selectName === shape.name) {
            const {
              width: shapeWidth = 0,
              height: shapeHeight = 0,
            } = shape.source as any;
            const {
              x,
              y,
              originX,
              originY,
              scaleX,
              scaleY,
              rotate,
            } = frameInfo;
            const centerX = shapeWidth * originX;
            const centerY = shapeHeight * originY;

            // Follow one is a simple wrapper example
            selectionEle = (
              <g
                key="selection"
                transform={`translate(${x - centerX}, ${y - centerY})`}
              >
                {/* Center scale */}
                <g
                  transform={`matrix(${scaleX}, 0, 0, ${scaleY}, ${centerX -
                    scaleX * centerX}, ${centerY - scaleY * centerY})`}
                >
                  {/* Center Rotate */}
                  <g transform={`rotate(${rotate}, ${centerX}, ${centerY})`}>
                    <rect
                      x="0"
                      y="0"
                      width={shapeWidth}
                      height={shapeHeight}
                      stroke="blue"
                      fill="transparent"
                    />
                  </g>
                </g>
              </g>
            );
          }

          return (
            <React.Fragment key={element.key!}>
              {selectionEle}
              {clone}
            </React.Fragment>
          );
        }}
      />
    </div>
  );
};

export default Demo;
