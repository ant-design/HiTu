import * as React from 'react';
import { FrameInfo, Shape, Info } from '../interface';
import { fillInfo, getTransitionValue } from '../utils/svgUtil';

type ShapeInfo = Info & { frames?: FrameInfo[] };

export default function useFramer(
  totalFrames: number,
  frameRate: number = 16,
): [
  number,
  (start: boolean) => void,
  (shapeInfo: ShapeInfo) => Required<Info>,
] {
  const [frame, setFrame] = React.useState(0);
  const frameIdRef = React.useRef(null);
  const triggerRef = React.useRef(false);
  const timestampRef = React.useRef(Date.now());
  const timesDiffRef = React.useRef(0);
  const initRef = React.useRef(false);

  function cancelMotion() {
    triggerRef.current = false;
    window.cancelAnimationFrame(frameIdRef.current!);
  }

  function nextFrame() {
    if (!totalFrames) {
      cancelMotion();
      return;
    }

    window.requestAnimationFrame(() => {
      const now = Date.now();
      const timestampDiff = now - timestampRef.current + timesDiffRef.current;
      const frameDiff = Math.floor(timestampDiff / frameRate);
      setFrame(currentFrame => (currentFrame + frameDiff) % totalFrames);
      timesDiffRef.current = timestampDiff % frameRate;
      timestampRef.current = now;

      nextFrame();
    });
  }

  function triggerMotion(start: boolean) {
    if (triggerRef.current === start) {
      return;
    }

    triggerRef.current = start;
    if (start) {
      timestampRef.current = Date.now();
      timesDiffRef.current = 0;
      nextFrame();
    } else {
      cancelMotion();
    }
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
          opacity: getTransitionValue(startInfo.opacity, endInfo.opacity, ptg),
        };
      }
    }

    return fillInfo(frames[frames.length - 1]);
  }

  // Default to start motion
  if (!initRef.current) {
    triggerMotion(true);
    initRef.current = true;
  }

  // Clean up
  React.useEffect(() => cancelMotion, []);

  return [frame, triggerMotion, getFrameInfo];
}
