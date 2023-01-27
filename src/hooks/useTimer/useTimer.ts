import { useCallback, useEffect, useReducer } from "react";
import { Config, Timer } from "./types";
import reducer from "./state/reducer";

export const useTimer = ({
  autostart = false,
  endTime,
  initialStatus = "STOPPED",
  initialTime = 0,
  interval = 1000,
  onTimeOver,
  onTimeUpdate,
  step = 1,
  timerType = "INCREMENTAL",
}: Partial<Config> = {}): Timer => {
  const [state, dispatch] = useReducer(reducer, {
    status: initialStatus,
    value: initialTime,
    timerType,
  });

  const { status, value } = state;

  const advanceTime = useCallback((timeToAdd: number) => {
    dispatch({ type: "advanceTime", payload: { timeToAdd } });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: "pause" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "reset", payload: { initialTime } });
  }, [initialTime]);

  const start = useCallback(() => {
    dispatch({ type: "start", payload: { initialTime } });
  }, [initialTime]);

  useEffect(() => {
    if (autostart) {
      dispatch({ type: "start", payload: { initialTime } });
    }
  }, [autostart, initialTime]);

  useEffect(() => {
    if (typeof onTimeUpdate === "function") {
      onTimeUpdate(value);
    }
  }, [value, onTimeUpdate]);

  useEffect(() => {
    if (status !== "STOPPED" && value === endTime) {
      dispatch({ type: "stop" });

      if (typeof onTimeOver === "function") {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, value, status]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (status === "RUNNING") {
      intervalId = setInterval(() => {
        dispatch({
          type: "set",
          payload: {
            newTime: timerType === "DECREMENTAL" ? value - step : value + step,
          },
        });
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, step, timerType, interval, value]);

  return { advanceTime, pause, reset, start, status, value };
};
