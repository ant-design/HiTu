import * as React from 'react';
import { Typography, Button } from 'antd';
import 'antd/dist/antd.min.css';
import HiTu from '../src';
import { randomName, getComponent } from './utils/randomUtil';
import { HiTuRefObject } from '../src/HiTu';
import './thinking.less';

const { Title, Paragraph } = Typography;

export default () => {
  const hiTuRef = React.useRef<HiTuRefObject>(null);

  const [_, forceUpdate] = React.useState<any>({});
  const [showTitle, setShowTitle] = React.useState(false);

  const [personName, setPersonName] = React.useState(() =>
    randomName(['摸头', '思考']),
  );
  const [clockName, setClockName] = React.useState(() =>
    randomName(['通用组件_彩色版', '!图表', '!盆栽']),
  );
  const [chartName, setChartName] = React.useState(() => randomName(['图表']));
  const [plantName, setPlantName] = React.useState(() => randomName(['盆栽']));
  const [plant2Name, setPlant2Name] = React.useState(() =>
    randomName(['盆栽']),
  );
  const Person = getComponent(personName);
  const Clock = getComponent(clockName);
  const Chart = getComponent(chartName);
  const Plant = getComponent(plantName);
  const Plant2 = getComponent(plant2Name);

  console.log('>>>', personName, clockName, chartName, plantName);

  return (
    <div style={{ height: 'calc(100vh - 20px)', position: 'relative' }}>
      <div className="operation-group">
        <Button
          onClick={() => {
            setPersonName(randomName(['摸头', '思考'], personName));
            setClockName(
              randomName(['通用组件_彩色版', '!图表', '!盆栽'], clockName),
            );
            setChartName(randomName(['图表'], clockName));
            setPlantName(randomName(['盆栽'], plantName));
            setPlant2Name(randomName(['盆栽'], plant2Name));
          }}
        >
          Random
        </Button>
        <Button
          onClick={() => {
            if (hiTuRef.current) {
              hiTuRef.current.triggerMotion();
            }
          }}
        >
          {hiTuRef.current && hiTuRef.current.getFramerInfo().play
            ? 'Stop'
            : 'Play'}
        </Button>
        <Button
          onClick={() => {
            setShowTitle(!showTitle);
          }}
        >
          Coder
        </Button>
      </div>
      <HiTu
        // debug
        width={1800}
        height={1000}
        style={{ height: '100%', width: '100%', background: '#FFFFFF' }}
        frames={200}
        ref={hiTuRef}
        onFrame={frame => {
          if (frame > 100 && hiTuRef.current) {
            hiTuRef.current.triggerMotion(false);
          }
          forceUpdate({});
        }}
        defaultPlay={false}
        shapes={[
          // Clock
          {
            type: 'shape',
            source: Clock,
            x: 850,
            y: 400,
            scaleX: 0.4,
            scaleY: 0.4,
            opacity: 0.5,
            frames: [
              {
                frame: 0,
                x: 850,
                y: 400,
                scaleX: 0.4,
                scaleY: 0.4,
                opacity: 0.5,
              },
              {
                frame: 50,
                x: 850,
                y: 250,
                scaleX: 0.5,
                scaleY: 0.5,
                opacity: 0.5,
              },
            ],
          },
          // Plant
          {
            type: 'shape',
            source: Plant,
            x: 1600,
            y: 1050,
            scaleX: 0.4,
            scaleY: 0.4,
            originY: 1,
            frames: [
              {
                frame: 0,
                x: 1600,
                y: 1050,
                scaleX: 0.4,
                scaleY: 0.4,
                originY: 1,
              },
              {
                frame: 50,
                x: 1700,
                y: 1300,
                scaleX: 0.7,
                scaleY: 0.7,
                originY: 1,
              },
            ],
          },
          // Plant2
          {
            type: 'shape',
            source: Plant2,
            opacity: 0,
            frames: [
              {
                frame: 0,
                opacity: 0,
                x: 800,
                y: 850,
                scaleX: 0.3,
                scaleY: 0.3,
              },
              {
                frame: 50,
                opacity: 1,
                x: 800,
                y: 800,
                scaleX: 0.3,
                scaleY: 0.3,
              },
            ],
          },
          // Chart
          {
            type: 'shape',
            source: Chart,
            x: 1500,
            y: 200,
            scaleX: 0.3,
            scaleY: 0.3,
            frames: [
              {
                frame: 0,
                x: 1500,
                y: 200,
                scaleX: 0.3,
                scaleY: 0.3,
              },
              {
                frame: 50,
                x: 1500,
                y: 450,
                scaleX: 0.3,
                scaleY: 0.3,
              },
            ],
          },
          // Person
          {
            type: 'shape',
            x: 1000,
            y: 800,
            scaleX: 3,
            scaleY: 3,
            source: Person,
            originY: 0.4,
            originX: 0.4,
            frames: [
              {
                frame: 0,
                x: 1000,
                y: 800,
                scaleX: 3,
                scaleY: 3,
                originY: 0.4,
                originX: 0.4,
              },
              {
                frame: 50,
                x: 1100,
                y: 400,
                scaleX: 1.4,
                scaleY: 1.4,
                originY: 0.4,
                originX: 0.4,
              },
            ],
          },
        ]}
      />

      {showTitle && (
        <Typography className="title-group">
          <h1 style={{ fontSize: 60, margin: '0 0 32px 0' }}>Hitu</h1>
          <p>Your Illustrator Graphic Creation Assistant</p>
          <p>From Ant Design AFX Team</p>
          <Button type="primary">LANDING</Button>
          <Button style={{ marginLeft: 16 }}>REGISTRATION</Button>
        </Typography>
      )}
    </div>
  );
};
