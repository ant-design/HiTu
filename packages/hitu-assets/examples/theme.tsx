import * as React from 'react';
import * as AllAssets from '../src';

function randomColor() {
  const hex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
}

const Person = AllAssets.Character_BusinessDevelopment_GetUp_Greet;
const colors = new Set<string>();
Person.__RAW__.match(/#[\da-fA-F]{3,6}/g).forEach(color => {
  colors.add(color);
});

export default () => {
  const [theme, setTheme] = React.useState<AllAssets.Theme>({});

  return (
    <div style={{ background: '#FFF' }}>
      <button
        type="button"
        onClick={() => {
          const newTheme = {
            '#253369': randomColor(),
            '#389E0D': randomColor(),
            '#7CB305': randomColor(),
            '#BAE637': randomColor(),
            '#FFF': randomColor(),
          };

          colors.forEach(color => {
            newTheme[color] = randomColor();
          });

          setTheme(newTheme);
        }}
      >
        Random Color
      </button>
      <br />
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
      <Person width={200} height={400} theme={theme} />
    </div>
  );
};
