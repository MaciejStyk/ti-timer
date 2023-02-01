import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IPlayer } from "../../../../redux/players";
import { IHandle, IMove } from "../../../../types";

interface IProps {
  currentPlayer: IPlayer;
  move: IMove;
  handle: IHandle;
}

const useAutoDeal = (props: IProps) => {
  const { currentPlayer, move, handle } = props;
  const { players, strategyPhase } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (
      strategyPhase.availableStrategyCards.length === 1 &&
      currentPlayer.id === players[players.length - 1].id &&
      players.length !== 7
    ) {
      move.toPlayersDeck(strategyPhase.availableStrategyCards[0]);
      handle.endTurn();
    }
  }, [currentPlayer.id, handle, move, players, strategyPhase.availableStrategyCards]);
};

export default useAutoDeal;
