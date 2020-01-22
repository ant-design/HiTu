import * as React from 'react';
import * as AllAssets from '../src';

function randomColor() {
  const hex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
}

export default () => {
  const [theme, setTheme] = React.useState<AllAssets.Theme>({});

  return (
    <div style={{ background: '#FFF' }}>
      {Object.keys(AllAssets)
        .filter(name => name.includes('Primary') && name.includes('Plant'))
        .map(name => {
          const Component = AllAssets[name] as React.ComponentType<
            AllAssets.AssetProps
          >;
          return (
            <Component key={name} width={200} height={200} theme={theme} />
          );
        })}
      <br />
      <button
        type="button"
        onClick={() => {
          setTheme({
            '#253369': randomColor(),
            '#389E0D': randomColor(),
            '#7CB305': randomColor(),
            '#FFF': randomColor(),
          });
        }}
      >
        Random Color
      </button>
    </div>
  );
};
