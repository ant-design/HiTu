import * as React from 'react';
import { FrameInfo, Shape, Info } from '../interface';
import { fillInfo, getTransitionValue } from '../utils/svgUtil';

type ShapeInfo = Info & { frames?: FrameInfo[] };

export interface FramerInfo {
  play: boolean;
  frame: number;
}

export default function useFramer(
  totalFrames: number,
  config?: {
    defaultPlay?: boolean;
    frameRate?: number;
    onPlay?: (play: boolean) => void;
    onFrame?: (frame: number) => void;
  },
): [
  number,
  (start?: boolean) => void,
  (shapeInfo: ShapeInfo) => Required<Info>,
  () => FramerInfo,
] {
  const { defaultPlay, frameRate = 16, onPlay, onFrame } = config || {};

  const [_, forceUpdate] = React.useState<object>({});
  const [frame, setFrame] = React.useState(0);
  const frameIdRef = React.useRef<number | null>(null);
  const triggerRef = React.useRef(false);
  const timestampRef = React.useRef(Date.now());
  const timesDiffRef = React.useRef(0);
  const initRef = React.useRef(false);

  React.useEffect(() => {
    if (onFrame) {
      onFrame(frame);
    }
  }, [frame]);

  function cancelMotion() {
    triggerRef.current = false;
    window.cancelAnimationFrame(frameIdRef.current!);
  }

  function nextFrame() {
    if (!totalFrames || !triggerRef.current) {
      cancelMotion();
      return;
    }

    frameIdRef.current = window.requestAnimationFrame(() => {
      const now = Date.now();
      const timestampDiff = now - timestampRef.current + timesDiffRef.current;
      const frameDiff = Math.floor(timestampDiff / frameRate);
      setFrame(currentFrame => (currentFrame + frameDiff) % totalFrames);
      timesDiffRef.current = timestampDiff % frameRate;
      timestampRef.current = now;

      nextFrame();
    });
  }

  function triggerMotion(start?: boolean) {
    const mergedStart = start !== undefined ? start : !triggerRef.current;

    if (triggerRef.current === mergedStart) {
      return;
    }

    triggerRef.current = mergedStart;
    if (mergedStart) {
      timestampRef.current = Date.now();
      timesDiffRef.current = 0;
      nextFrame();
    } else {
      cancelMotion();
    }

    if (onPlay) {
      onPlay(mergedStart);
    }

    forceUpdate({});
  }

  function getFrameInfo({ frames, ...rest }: ShapeInfo): Required<Info> {
    if (!frames || !frames.length) {
      return fillInfo(rest);
    }

    for (let i = 0; i < frames.length - 1; i += 1) {
      const startFrame = frames[i];
      const endFrame = frames[i + 1];

      // Getting motion
      if (startFrame.frame <= frame && frame < endFrame.frame) {
        const startInfo = fillInfo(startFrame);
        const endInfo = fillInfo(endFrame);
        const ptg =
          (frame - startFrame.frame) / (endFrame.frame - startFrame.frame);

        return {
          x: getTransitionValue(startInfo.x, endInfo.x, ptg),
          y: getTransitionValue(startInfo.y, endInfo.y, ptg),
          rotate: getTransitionValue(startInfo.rotate, endInfo.rotate, ptg),
          scaleX: getTransitionValue(startInfo.scaleX, endInfo.scaleX, ptg),
          scaleY: getTransitionValue(startInfo.scaleY, endInfo.scaleY, ptg),
          originX: getTransitionValue(startInfo.originX, endInfo.originX, ptg),
          originY: getTransitionValue(startInfo.originY, endInfo.originY, ptg),
          opacity: getTransitionValue(startInfo.opacity, endInfo.opacity, ptg),
        };
      }
    }

    return fillInfo(frames[frames.length - 1]);
  }

  function getFramerInfo() {
    return {
      play: triggerRef.current,
      frame,
    };
  }

  // Default to start motion
  if (!initRef.current && defaultPlay !== false) {
    triggerMotion(true);
    initRef.current = true;
  }

  // Clean up
  React.useEffect(() => cancelMotion, []);

  return [frame, triggerMotion, getFrameInfo, getFramerInfo];
}
