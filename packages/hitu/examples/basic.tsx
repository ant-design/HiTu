import * as React from 'react';
import * as allImages from '@ant-design/hitu-assets';
import HiTu from '../src';

const names = Object.keys(allImages).filter(name => name.includes('Character'));
function randomName() {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}

export default () => {
  const [personName, setPersonName] = React.useState(randomName());
  const Person = (allImages as any)[personName];

  return (
    <div style={{ height: 'calc(100vh - 20px)' }}>
      <button
        type="button"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
        }}
        onClick={() => {
          setPersonName(randomName());
        }}
      >
        Random
      </button>
      {/* <allImages.Common_Primary_Check width={100} height={100} /> */}
      <HiTu
        debug
        width={2000}
        height={1024}
        style={{
          height: '100%',
          width: '100%',
          // height: 1024,
          // width: 2000,
        }}
        frames={200}
        shapes={[
          {
            type: HiTu.TYPE_SHAPE,

            // scaleX: .1,
            // scaleY: .1,
            // x: 500,
            // y: 250,
            source: Person,
            frames: [
              { frame: 0, x: 0, y: 500, scaleX: -1, cubic: HiTu.CUBIC_EASE_IN },
              { frame: 90, x: 1000 },
              { frame: 100, x: 1000, scaleX: 1, cubic: HiTu.CUBIC_EASE_OUT },
              { frame: 190, x: 0 },
              { frame: 200, x: 0, scaleX: -1 },
            ],
          },
          {
            type: HiTu.TYPE_SHAPE,
            source: Person,
            frames: [
              { frame: 0, x: 1000, y: 500, rotate: 0 },
              { frame: 200, rotate: 720 },
            ],
          },
        ]}
      />
    </div>
  );
};
