/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import PLANT_SVG from './svg/plant';
import PEOPLE_SVG from './svg/people';
import { Character_Designer_Walking_Working } from '@ant-design/hitu-assets';
import HiTu from '../src';
import SVG from '../src/SVG';

const debug = false;

const Demo = () => {
  const plant = React.useMemo(() => {
    const svg = SVG.parse(PLANT_SVG, { debug });
    return React.cloneElement(svg, {
      style: {
        border: '1px solid red',
      },
    });
  }, [PLANT_SVG]);

  const people = React.useMemo(() => {
    const svg = SVG.parse(PEOPLE_SVG, { debug });
    return React.cloneElement(svg, {
      style: {
        border: '1px solid red',
      },
    });
  }, [PEOPLE_SVG]);

  const designer = React.useMemo(() => {
    const svg = SVG.parse(
      `<svg>${Character_Designer_Walking_Working.__RAW__}</svg>`,
      {
        debug,
        width: Character_Designer_Walking_Working.width,
        height: Character_Designer_Walking_Working.height,
      },
    );
    return React.cloneElement(svg, {
      style: {
        border: '1px solid red',
      },
    });
  }, [Character_Designer_Walking_Working.__RAW__]);

  return (
    <div>
      {plant}
      {people}
      {designer}
    </div>
  );
};

export default Demo;
