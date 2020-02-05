import * as React from 'react';
import { Chip } from '../interface';

export class ChipManger {
  private chips?: Chip[];
  private chipsCache = new Map<string, Chip>();
  private frame: number = 0;

  constructor(chips?: Chip[]) {
    this.chips = chips;
    (this.chips || []).forEach(chip => {
      this.chipsCache.set(chip.path.join('___'), chip);
    });
  }

  getChip(path?: number[]) {
    return path && this.chipsCache.get(path.join('___'));
  }

  setFrame(frame: number) {
    this.frame = frame;
  }
}

export interface SVGContextProps {
  chipManger: ChipManger;
}

const SVGContext = React.createContext<SVGContextProps>({
  chipManger: new ChipManger(),
});

export default SVGContext;
