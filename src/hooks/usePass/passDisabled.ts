import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import views from "../../global/views";
import { RootState } from "../../redux";
import { ITime } from "../../types";

const usePassDisabled = (time: ITime) => {
  const { current, players, playerIndex, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players.length !== 0 ? players[playerIndex] : null;

  const [passDisabled, setPassDisabled] = useState(true);

  useEffect(() => {
    if (current.view === views.actionPhase) {
      setPassDisabled(
        !time.isRunning ||
          strategyAction.isBeingPlayed ||
          (currentPlayer
            ? currentPlayer!.strategyCards.some((card) => !card.exhausted)
            : true)
      );
    } else {
      setPassDisabled(true);
    }
  }, [
    currentPlayer?.strategyCards.length,
    time.isRunning,
    current.view,
    strategyAction.isBeingPlayed,
    currentPlayer,
  ]);

  return passDisabled;
};

export default usePassDisabled;
