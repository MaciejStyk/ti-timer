import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { RootState } from "../../../../redux";
import { IPlayer } from "../../../../redux/reducers/players";
import { ITime } from "../../../../types";

interface IProps {
  time: ITime;
  currentPlayer: IPlayer;
  makeStrategyAction: (strategyCard: IStrategyCard) => void;
}

const useKeyBindings = (props: IProps) => {
  const { time, currentPlayer, makeStrategyAction } = props;
  const { strategyAction } = useSelector((state: RootState) => state);

  const [firstPress, setFirstPress] = useState({
    id: 0,
    pressed: false,
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (time.isRunning && Number(event.key) && Number(event.key) > 0) {
        const cardID = Number(event.key);
        if (
          currentPlayer.strategyCards.some(
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
    currentPlayer.strategyCards,
    firstPress,
    time.isRunning,
    makeStrategyAction,
    strategyAction.isBeingPlayed,
  ]);
};

export default useKeyBindings;
