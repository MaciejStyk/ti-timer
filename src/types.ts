export interface IGameProps {
  isRunning: boolean;
  timeDelayed: number;
  timeElapsed: number;
  timeBank: number;
  handlePause: () => void;
  handleEndTurn: () => void;
  handlePass: () => void;
  nextTurnDisabled: boolean;
  passDisabled: boolean;
  endPhase: () => void;
}