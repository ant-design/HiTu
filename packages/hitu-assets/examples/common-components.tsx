import * as React from 'react';
import * as AllAssets from '../src';
import ComponentWrapper from './common/ComponentWrapper';

export default () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(AllAssets)
        .filter(name => name.includes('Common'))
        .map(name => {
          const Component = AllAssets[name];
          return (
            <ComponentWrapper key={name} name={name}>
              <Component width="100%" height="auto" />
            </ComponentWrapper>
          );
        })}
    </div>
  );
};
