import * as React from 'react';
import * as AllAssets from '../src';

export default () => {
  return (
    <div>
      {Object.keys(AllAssets)
        .filter(name => name.includes('Plant'))
        .map(name => {
          const Component = AllAssets[name] as React.ComponentType<
            AllAssets.AssetProps
          >;
          return (
            <Component
              key={name}
              width={200}
              height={200}
              theme={{
                '#253369': '#FF0000',
              }}
            />
          );
        })}
    </div>
  );
};
