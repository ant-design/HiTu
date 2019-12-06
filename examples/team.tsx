import * as React from 'react';
import HiTu from '../src';
import * as allImages from '../output';

// name.includes('思考') ||

const names = Object.keys(allImages).filter(name => name.includes('摸头'));
function randomName(prevName?: string): string {
  const index = Math.floor(Math.random() * names.length);
  const name = names[index];

  if (prevName === name) {
    return randomName(prevName);
  }

  return name;
}

export default () => {
  const [personName, setPersonName] = React.useState(() => randomName());
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
          setPersonName(randomName(personName));
        }}
      >
        Random
      </button>
      <HiTu
        debug
        width={1500}
        height={1000}
        style={{ height: '100%', width: '100%', background: '#FFFFFF' }}
        frames={0}
        shapes={[
          {
            type: 'shape',
            x: 700,
            y: -300,
            scaleX: 3,
            scaleY: 3,
            source: Person,
            originY: 0,
            // frames: [
            //   { scaleX: 1, scaleY: 1, frame: 0 },
            //   { scaleX: 2, scaleY: 2, frame: 100 },
            //   { scaleX: 1, scaleY: 1, frame: 200 },
            // ],
          },
        ]}
      />
    </div>
  );
};
