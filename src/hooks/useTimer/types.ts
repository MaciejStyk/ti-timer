export type TimerType = "DECREMENTAL" | "INCREMENTAL";

export type Status = "RUNNING" | "PAUSED" | "STOPPED";

export type Config = {
  autostart: boolean;
  endTime: number | null;
  initialStatus: Status;
  initialTime: number;
  interval: number;
  onTimeOver?: () => void;
  onTimeUpdate?: (time: number) => void;
  step: number;
  timerType: TimerType;
};

export type Timer = {
  advanceTime: (timeToAdd: number) => void;
  pause: () => void;
  reset: () => void;
  start: () => void;
  status: Status;
  value: number;
};

export interface State {
  status: Status;
  value: number;
  timerType: TimerType;
}
