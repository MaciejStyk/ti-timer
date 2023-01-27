import { useEffect, useState } from "react";
import views from "../../global/views";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { IChoosePlayerAction } from "../../redux/choosePlayerAction";
import { IPlayer } from "../../redux/players";
import { IRaces } from "../../redux/races";
import { IStrategyAction } from "../../redux/strategyAction";
import { IStrategyPhase } from "../../redux/strategyPhase";
import { ITime } from "../../types";
import useFinishStrategyAction from "./finishStrategyAction";
import useFinishVoting from "./finishVoting";
import useNextPlayer from "./nextPlayer";
import useUpdateTimebank from "./updateTimebank";

interface IProps {
  time: ITime;
  view: string;
  players: IPlayer[];
  races: IRaces;
  playerIndex: number;
  currentPlayer: IPlayer | null;
  roundOrder: IPlayer[];
  agendaPhase: IAgendaPhase;
  strategyPhase: IStrategyPhase;
  strategyAction: IStrategyAction;
  choosePlayerAction: IChoosePlayerAction;
  endPhase: () => void;
}

const useEndTurn = (props: IProps) => {
  const {
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
  } = props;

  const updateCurrentPlayerTimebank = useUpdateTimebank({
    time,
    currentPlayer,
  });

  const finishStrategyAction = useFinishStrategyAction({
    players,
    playerIndex,
    roundOrder,
    strategyAction,
  });

  const finishVoting = useFinishVoting({ players, playerIndex, agendaPhase });

  const switchToNextPlayer = useNextPlayer({
    view,
    players,
    races,
    playerIndex,
    strategyPhase,
  });

  const endTurn = () => {
    updateCurrentPlayerTimebank();
    finishStrategyAction();
    finishVoting();
    switchToNextPlayer();
    endPhase();
  };

  const [endTurnDisabled, setEndTurnDisabled] = useState(true);

  useEffect(() => {
    switch (view) {
      case views.strategyPhase:
        setEndTurnDisabled(
          !time.isRunning ||
            currentPlayer?.strategyCards.length !== strategyPhase.round
        );
        break;
      case views.actionPhase:
        setEndTurnDisabled(!time.isRunning || choosePlayerAction.playable);
        break;
      default:
        setEndTurnDisabled(!time.isRunning);
    }
  }, [
    currentPlayer?.strategyCards.length,
    strategyPhase.round,
    choosePlayerAction.playable,
    strategyPhase.numberOfRounds,
    view,
    time.isRunning,
  ]);

  return { endTurn, endTurnDisabled };
};

export default useEndTurn;
