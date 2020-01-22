import * as React from 'react';
import * as AllAssets from '../src';

export default () => {
  return (
    <div>
      {Object.keys(AllAssets)
        .filter(name => name.includes('Plant'))
        .map(name => {
          const Component = AllAssets[name];
          return <Component key={name} width={200} height={200} />;
        })}
    </div>
  );
};
