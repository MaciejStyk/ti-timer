import { Timer } from "./hooks/useTimer/types";
export interface IPhaseProps {
  time: ITime;
  handle: IHandle;
}

export interface ITime {
  delayed: Timer;
  elapsed: Timer;
  bank: Timer;
  isRunning: boolean;
}

export interface IHandle {
  pause: () => void;
  endTurn: () => void;
  endTurnDisabled: boolean;
  pass: () => void;
  passDisabled: boolean;
  endPhase: () => void;
}
