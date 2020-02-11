/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import PLANT_SVG from './svg/plant';
import PEOPLE_SVG from './svg/people';
import { Character_Designer_Walking_Working } from '@ant-design/hitu-assets';
import HiTu from '../src';
import SVG from '../src/SVG';

const debug = false;

const Demo = () => {
  return (
    <div>
      <HiTu
        debug
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
