import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IPhaseProps } from "../../../../types";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";
import useStrategyAction from "../useStrategyAction";

const useKeyBindings = (props: IPhaseProps) => {
  const { time } = props;
  const { strategyAction } = useSelector((state: RootState) => state);
  const { currentPlayer } = useCurrentPlayer();
  const makeStrategyAction = useStrategyAction();

  const [firstPress, setFirstPress] = useState({
    id: 0,
    pressed: false,
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (time.isRunning && Number(event.key) && Number(event.key) > 0) {
        const cardID = Number(event.key);
        if (
          currentPlayer?.strategyCards.some(
            (card) => card.id === cardID && !card.exhausted
          ) &&
          !strategyAction.isBeingPlayed
        ) {
          if (firstPress.pressed && firstPress.id === cardID) {
            event.preventDefault();
            makeStrategyAction(
              currentPlayer.strategyCards.find((card) => card.id === cardID)!
            );
            setFirstPress({
              id: 0,
              pressed: false,
            });
          } else {
            setFirstPress({
              id: cardID,
              pressed: true,
            });
            window.setTimeout(function () {
              setFirstPress({
                id: 0,
                pressed: false,
              });
            }, 500);
          }
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [
    currentPlayer?.strategyCards,
    firstPress,
    time.isRunning,
    makeStrategyAction,
    strategyAction.isBeingPlayed,
  ]);
};

export default useKeyBindings;
