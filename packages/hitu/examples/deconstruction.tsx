/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import PLANT_SVG from './svg/plant';
import HiTu from '../src';
import SVG from '../src/SVG';

const Demo = () => {
  const node = React.useMemo(() => {
    const svg = SVG.parse(PLANT_SVG, { debug: true });
    return React.cloneElement(svg, {
      style: {
        border: '1px solid red',
      },
    });
  }, [PLANT_SVG]);

  return <div>{node}</div>;
};

export default Demo;
