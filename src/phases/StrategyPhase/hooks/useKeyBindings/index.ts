import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IMove, ITime } from "../../../../types";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";

interface IProps {
  time: ITime;
  move: IMove;
}

const useKeyBindings = (props: IProps) => {
  const { time, move } = props;
  const { strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayer, currentPlayerCanPick } = useCurrentPlayer();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (time.isRunning && Number(event.key) && Number(event.key) > 0) {
        const cardID = Number(event.key);
        if (
          strategyPhase.availableStrategyCards.some(
            (card) => card.id === cardID
          ) &&
          currentPlayerCanPick
        ) {
          event.preventDefault();
          move.toPlayersDeck(
            strategyPhase.availableStrategyCards.find(
              (card) => card.id === cardID
            )!
          );
        }
        if (
          currentPlayer?.strategyCards.some(
            (card, index) =>
              card.id === cardID && index === strategyPhase.round - 1
          )
        ) {
          event.preventDefault();
          move.toAvailableDeck(
            currentPlayer.strategyCards[strategyPhase.round - 1]
          );
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [
    currentPlayer?.strategyCards,
    currentPlayerCanPick,
    time.isRunning,
    strategyPhase.availableStrategyCards,
    strategyPhase.round,
    move,
  ]);
};

export default useKeyBindings;
