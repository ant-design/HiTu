/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import { Character_ProductManager_LeanBack_Explain } from '@ant-design/hitu-assets';
import HiTu from '../src';

export default () => {
  return (
    <div style={{ height: 'calc(100vh - 20px)' }}>
      <HiTu
        width={1000}
        height={500}
        shapes={[
          {
            type: 'shape',
            source: Character_ProductManager_LeanBack_Explain,
            frames: [],
          },
        ]}
      />
    </div>
  );
};
