import * as React from 'react';
import { FrameInfo, Info } from '../interface';
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
    defaultFrame?: number;
    frameRate?: number;
    onPlay?: (play: boolean) => void;
    onFrame?: (frame: number) => void;
    loop?: boolean;
  },
): [
  number,
  (start?: boolean) => void,
  (shapeInfo: ShapeInfo) => Required<Info>,
  () => FramerInfo,
] {
  // const { defaultPlay, frameRate = 60, onPlay, onFrame, loop } = config || {};
  const configRef = React.useRef(config || {});
  configRef.current = config || {};

  const [_, forceUpdate] = React.useState<object>({});
  const frameRef = React.useRef(configRef.current.defaultFrame || 0);
  const frameIdRef = React.useRef<number | null>(null);
  const triggerRef = React.useRef(false);
  const timestampRef = React.useRef(Date.now());
  const timesDiffRef = React.useRef(0);
  const initRef = React.useRef(false);

  // Frame
  function getFrameDuration() {
    return Math.floor(1000 / (configRef.current.frameRate || 60));
  }

  let triggerMotion: (start?: boolean) => void;

  function setFrame(frame: number) {
    if (frameRef.current !== frame) {
      frameRef.current = frame;
      forceUpdate({});
    }
  }

  function cancelMotion() {
    triggerRef.current = false;
    window.cancelAnimationFrame(frameIdRef.current!);
  }

  function nextFrame(manual: boolean) {
    if (!totalFrames || !triggerRef.current) {
      cancelMotion();
      return;
    }

    frameIdRef.current = window.requestAnimationFrame(() => {
      const frameDuration = getFrameDuration();

      const now = Date.now();
      const timestampDiff = now - timestampRef.current + timesDiffRef.current;
      const frameDiff = Math.floor(timestampDiff / frameDuration);
      let targetFrame = frameRef.current + frameDiff;

      if (targetFrame >= totalFrames) {
        if (configRef.current.loop !== false || manual) {
          targetFrame = 0;
        } else {
          targetFrame = totalFrames - 1;
          triggerMotion(false);
        }
      }

      /**
       * Loop to trigger `onFrame`.
       * This should trigger each event by each frame even if not displayed
       */
      if (configRef.current.onFrame) {
        const startFrame = frameRef.current;
        let endFrame = targetFrame;

        if (targetFrame === 0) {
          endFrame = totalFrames - 1;
        }

        for (let frame = startFrame + 1; frame <= endFrame; frame += 1) {
          configRef.current.onFrame(frame);
        }

        // Trigger missing frame: 0
        if (targetFrame === 0) {
          configRef.current.onFrame(0);
        }
      }

      setFrame(targetFrame);
      timesDiffRef.current = timestampDiff % frameDuration;
      timestampRef.current = now;

      nextFrame(false);
    });
  }

  triggerMotion = (start?: boolean) => {
    const mergedStart = start !== undefined ? start : !triggerRef.current;

    if (triggerRef.current === mergedStart) {
      return;
    }

    triggerRef.current = mergedStart;
    if (mergedStart) {
      timestampRef.current = Date.now();
      timesDiffRef.current = 0;

      if (frameRef.current >= totalFrames - 1) {
        frameRef.current = 0;
      }

      nextFrame(true);
    } else {
      cancelMotion();
    }

    if (configRef.current.onPlay) {
      configRef.current.onPlay(mergedStart);
    }

    forceUpdate({});
  };

  function getFrameInfo({ frames, ...rest }: ShapeInfo): Required<Info> {
    if (!frames || !frames.length) {
      return fillInfo(rest);
    }

    for (let i = 0; i < frames.length - 1; i += 1) {
      const startFrame = frames[i];
      const endFrame = frames[i + 1];

      // Getting motion
      if (
        startFrame.frame <= frameRef.current &&
        frameRef.current < endFrame.frame
      ) {
        const startInfo = fillInfo(startFrame, {
          frames: frames.slice(0, i),
        });
        const endInfo = fillInfo(endFrame, { frames: frames.slice(0, i + 1) });
        const ptg =
          (frameRef.current - startFrame.frame) /
          (endFrame.frame - startFrame.frame);

        const { cubic } = startFrame;

        return {
          x: getTransitionValue(startInfo.x, endInfo.x, ptg, cubic),
          y: getTransitionValue(startInfo.y, endInfo.y, ptg, cubic),
          rotate: getTransitionValue(
            startInfo.rotate,
            endInfo.rotate,
            ptg,
            cubic,
          ),
          scaleX: getTransitionValue(
            startInfo.scaleX,
            endInfo.scaleX,
            ptg,
            cubic,
          ),
          scaleY: getTransitionValue(
            startInfo.scaleY,
            endInfo.scaleY,
            ptg,
            cubic,
          ),
          originX: getTransitionValue(
            startInfo.originX,
            endInfo.originX,
            ptg,
            cubic,
          ),
          originY: getTransitionValue(
            startInfo.originY,
            endInfo.originY,
            ptg,
            cubic,
          ),
          opacity: getTransitionValue(
            startInfo.opacity,
            endInfo.opacity,
            ptg,
            cubic,
          ),
        };
      }
    }

    return fillInfo(frames[frames.length - 1], {
      frames: frames.slice(0, -1),
    });
  }

  function getFramerInfo() {
    return {
      play: triggerRef.current,
      frame: frameRef.current,
    };
  }

  React.useEffect(() => {
    // Default to start motion
    if (!initRef.current && configRef.current.defaultPlay !== false) {
      triggerMotion(true);
      initRef.current = true;
    }

    // Clean up
    return cancelMotion;
  }, []);

  return [frameRef.current, triggerMotion, getFrameInfo, getFramerInfo];
}
