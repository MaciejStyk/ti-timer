import { Timer } from "./hooks/useTimer/types";
export interface IPhaseProps {
  time: ITime;
  handlePause: () => void;
  handleEndTurn: () => void;
  endTurnDisabled: boolean;
  handlePass: () => void;
  passDisabled: boolean;
  endPhase: () => void;
}

export interface ITime {
  delayed: Timer;
  elapsed: Timer;
  bank: Timer;
  isRunning: boolean;
}
