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

const Icon = () => (
  <svg>
    <image
      href="https://gw.alipayobjects.com/zos/basement_prod/c6935869-a270-463a-8303-9273173c189f.svg"
      height="30"
      width="30"
    />
  </svg>
);
Icon.width = 30;
Icon.height = 30;

export default function Logo() {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(false);

  return (
    <div
      className="home-card-logo"
      onMouseEnter={() => {
        setLoop(true);
        hituRef.current?.triggerMotion(true);
      }}
      onMouseLeave={() => {
        setLoop(false);
      }}
    >
      <HiTu
        ref={hituRef}
        width={200}
        height={200}
        style={{ width: 200, height: 200, background: 'yellow' }}
        loop={loop}
        frames={60}
        onFrame={frame => {
          console.log('>>>', frame);
        }}
        shapes={[
          {
            type: 'shape',
            source: AntDesign,
            x: 15,
            y: 15,
            frames: [
              {
                frame: 0,
                x: 15,
                y: 15,
                rotate: 0,
              },
              {
                frame: 59,
                rotate: 360,
              },
            ],
          },
          {
            type: 'shape',
            source: Icon,
            x: 55,
            y: 15,
            frames: [
              {
                frame: 0,
                x: 55,
                y: 15,
                rotate: 0,
              },
              {
                frame: 59,
                rotate: 360,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
