import { ITime } from "../../types";
import { IPlayer } from "../../redux/players";
import { ITimer } from "../../redux/timer";
import { IRaces } from "../../redux/races";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { IStrategyPhase } from "../../redux/strategyPhase";
import { IStrategyAction } from "../../redux/strategyAction";
import { IChoosePlayerAction } from "../../redux/choosePlayerAction";
import useEndPhase from "../useEndPhase";
import useEndTurn from "../useEndTurn";
import usePause from "../usePause";
import usePass from "../usePass";

interface IProps {
  time: ITime;
  view: string;
  players: IPlayer[];
  timer: ITimer;
  races: IRaces;
  playerIndex: number;
  currentPlayer: IPlayer | null;
  roundOrder: IPlayer[];
  tableOrder: IPlayer[];
  agendaPhase: IAgendaPhase;
  strategyPhase: IStrategyPhase;
  strategyAction: IStrategyAction;
  choosePlayerAction: IChoosePlayerAction;
}

const useHandlers = (props: IProps) => {
  const {
    time,
    view,
    players,
    timer,
    races,
    playerIndex,
    currentPlayer,
    roundOrder,
    tableOrder,
    agendaPhase,
    strategyPhase,
    strategyAction,
    choosePlayerAction,
  } = props;

  const pause = usePause(time);

  const endPhase = useEndPhase({
    view,
    players,
    timer,
    races,
    playerIndex,
    tableOrder,
    agendaPhase,
    strategyPhase,
  });

  const { endTurn, endTurnDisabled } = useEndTurn({
    time,
    view,
    players,
    races,
    playerIndex,
    currentPlayer,
    roundOrder,
    agendaPhase,
    strategyPhase,
    strategyAction,
    choosePlayerAction,
    endPhase,
  });

  const { pass, passDisabled } = usePass({
    time,
    view,
    currentPlayer,
    strategyAction,
    endTurn,
  });

  return { pause, endTurn, endTurnDisabled, pass, passDisabled, endPhase };
};

export default useHandlers;
