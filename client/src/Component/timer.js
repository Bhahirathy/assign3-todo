import { useCallback, useState } from "react";
import { second } from "./second";

export const useTimer = ({
  seconds: initialSeconds = 0,
  running: initiallyRunning = false
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);
  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );
  const start = (e) => {
    setRunning(true);
  };
  
  const pause = () => setRunning(!running);
  const reset = () => setSeconds(0);
  const stop = () => {
    pause();
    reset();
  };

  second(tick);

  return { pause, reset, running, seconds, start, stop };
};
