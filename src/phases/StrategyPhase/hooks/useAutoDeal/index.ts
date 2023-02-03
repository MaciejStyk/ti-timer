import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IHandle, IMove } from "../../../../types";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";

interface IProps {
  move: IMove;
  handle: IHandle;
}

const useAutoDeal = (props: IProps) => {
  const { move, handle } = props;
  const { players, strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayer } = useCurrentPlayer();

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
