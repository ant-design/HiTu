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
            scaleX: 500 / 1024,
            scaleY: 500 / 1024,
            originX: 0,
            originY: 0,
            frames: [],
          },
        ]}
      />
    </div>
  );
};

export default Demo;
