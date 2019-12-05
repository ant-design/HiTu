import * as React from 'react';
import HiTu from '../src';
import people from './svg/people1';

export default () => {
  return (
    <div style={{ height: 'calc(100vh - 20px)' }}>
      <HiTu
        debug
        width={800}
        height={800}
        style={{ height: '100%', width: '100%' }}
        frames={60}
        shapes={[
          {
            type: 'shape',
            source: people,
            x: 100,
            rotate: 45,
            frames: [
              { frame: 0, x: 0 },
              { frame: 60, x: 100 },
            ],
          },
        ]}
      />
    </div>
  );
};
