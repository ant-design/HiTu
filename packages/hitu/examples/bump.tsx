import * as React from 'react';
import Hitu, { HiTuRefObject } from '../src';

const Red = () => (
  <svg>
    <circle cx="15" cy="15" r="9" fill="#FF0000" />
    <rect x="14" y="0" width="2" height="30" fill="#00FF00" />
  </svg>
);

Red.width = 30;
Red.height = 30;

const Blue = () => (
  <svg>
    <circle cx="15" cy="15" r="9" fill="#0000FF" />
    <rect x="0" y="14" width="30" height="2" fill="#00FF00" />
  </svg>
);

Blue.width = 30;
Blue.height = 30;

const Icons = [Red, Blue];

export default () => {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(false);
  const [ab, setAB] = React.useState(0);
  const Icon = Icons[ab];

  return (
    <div
      style={{ margin: '100px auto', width: 200, background: 'yellow' }}
      onMouseEnter={() => {
        setLoop(true);
        if (hituRef.current) {
          hituRef.current.triggerMotion(true);
        }
      }}
      onMouseLeave={() => {
        setLoop(false);
      }}
    >
      <Hitu
        width={64}
        height={64}
        ref={hituRef}
        style={{ width: 64, height: 64 }}
        defaultFrame={1}
        frames={40}
        loop={loop}
        defaultPlay={false}
        onFrame={frame => {
          if (frame === 10) {
            setAB((ab + 1) % 2);
          }
        }}
        shapes={[
          {
            type: 'shape',
            source: Icon,
            frames: [
              {
                frame: 0,
                x: 32,
                y: 32,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
              },
              {
                frame: 10,
                opacity: 0,
                scaleX: 1.5,
                scaleY: 1.5,
              },
              {
                frame: 11,
                scaleX: 0.5,
                scaleY: 0.5,
                opacity: 0,
              },
              {
                frame: 30,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
              },
            ],
          },
        ]}
      />
    </div>
  );
};
