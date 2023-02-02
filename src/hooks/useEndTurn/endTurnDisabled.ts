import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { ITime } from "../../types";
import views from "../../global/views";

const useEndTurnDisabled = (time: ITime) => {
  const { current, players, strategyPhase, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer =
    players.length !== 0 ? players[current.playerIndex] : null;

  const [endTurnDisabled, setEndTurnDisabled] = useState(true);

  useEffect(() => {
    switch (current.view) {
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
    current.view,
    time.isRunning,
  ]);

  return endTurnDisabled;
};

export default useEndTurnDisabled;
