import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IHandle } from "../../../../types";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";
import useMove from "../useMove";

const useAutoDeal = (handle: IHandle) => {
  const { players, strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayer } = useCurrentPlayer();
  const move = useMove();

  useEffect(() => {
    if (
      strategyPhase.availableStrategyCards.length === 1 &&
      currentPlayer?.id === players[players.length - 1].id &&
      players.length !== 7
    ) {
      move.toPlayersDeck(strategyPhase.availableStrategyCards[0]);
      handle.endTurn();
    }
  }, [
    currentPlayer?.id,
    handle,
    move,
    players,
    strategyPhase.availableStrategyCards,
  ]);
};

export default useAutoDeal;
