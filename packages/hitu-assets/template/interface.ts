import * as React from 'react';

export interface Theme {}

export interface AssetProps extends React.SVGAttributes<SVGElement> {
  theme?: Theme;
}

export interface AssetComponent
  extends React.ForwardRefExoticComponent<AssetProps> {
  __RAW__: string;
  width: number;
  height: number;
}
