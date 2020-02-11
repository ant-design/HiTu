/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import PLANT_SVG from './svg/plant';
import HiTu, { getColors } from '../src';

const debug = false;

const colors = getColors(PLANT_SVG);

const Demo = () => {
  const [customizeColors, setCustomizeColors] = React.useState<
    Record<string, string>
  >({});

  console.log('Colors:', customizeColors);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          const newColor: Record<string, string> = {};
          colors.forEach(color => {
            newColor[color] = `#${Math.floor(Math.random() * 16777215).toString(
              16,
            )}`;
          });

          setCustomizeColors(newColor);
        }}
      >
        Random Color
      </button>
      <br />
      <HiTu
        debug={debug}
        width={1000}
        height={500}
        style={{ width: 1000, height: 500, border: '1px solid orange' }}
        frames={60}
        shapes={[
          {
            type: 'svgText',
            source: PLANT_SVG,
            frames: [
              {
                frame: 0,
                x: 250,
                y: 250,
                scaleX: 500 / 1024,
                scaleY: 500 / 1024,
                rotate: 0,
              },
              {
                frame: 60,
                rotate: 360,
              },
            ],
            chips: [
              {
                path: [0],
                frames: [
                  {
                    frame: 0,
                    x: 100,
                    y: 1000,
                  },
                  {
                    frame: 60,
                    x: 0,
                    y: 0,
                  },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Demo;
