import * as React from 'react';
import HiTu from '../src';
import { HiTuRefObject } from '../src/HiTu';

const AntDesign = () => (
  <svg>
    <circle cx="15" cy="15" r="9" fill="#FF0000" />
    <rect x="14" y="0" width="2" height="30" fill="#00FF00" />
  </svg>
);

AntDesign.width = 30;
AntDesign.height = 30;

export default function Logo() {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(true);

  return (
    <div className="home-card-logo">
      <HiTu
        ref={hituRef}
        width={200}
        height={200}
        style={{ width: 200, height: 200, background: 'yellow' }}
        loop={loop}
        frames={200}
        shapes={[
          {
            type: 'shape',
            source: AntDesign,
            originX: 0,
            originY: 0,
            frames: [
              {
                frame: 0,
                x: 15,
                y: 15,
                rotate: 0,
              },
              // {
              //   frame: 10,
              //   rotate: -30,
              // },
              // {
              //   frame: 100,
              //   rotate: 720,
              // },
              {
                frame: 200,
                rotate: 720,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
