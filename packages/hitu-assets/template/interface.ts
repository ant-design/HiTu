import * as React from 'react';

export interface Theme {}

export interface AssetProps extends React.SVGAttributes<SVGElement> {
  theme: Theme;
}

export interface AssetComponent
  extends React.RefForwardingComponent<SVGSVGElement, AssetProps> {
  width: number;
  height: number;
}
