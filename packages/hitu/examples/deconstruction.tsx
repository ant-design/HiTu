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
        width={1000}
        height={500}
        style={{ width: 1000, height: 500 }}
        shapes={[
          {
            type: 'svgText',
            source: PLANT_SVG,
          },
        ]}
      />
    </div>
  );
};

export default Demo;
