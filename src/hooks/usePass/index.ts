import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import views from "../../global/views";
import { IPlayer, passPlayer } from "../../redux/players";
import { IStrategyAction } from "../../redux/strategyAction";
import { ITime } from "../../types";

interface IProps {
  time: ITime;
  view: string;
  currentPlayer: IPlayer | null;
  strategyAction: IStrategyAction;
  endTurn: () => void;
}

const usePass = (props: IProps) => {
  const { time, view, currentPlayer, strategyAction, endTurn } = props;
  const dispatch = useDispatch();

  const pass = () => {
    if (currentPlayer) {
      dispatch(passPlayer(currentPlayer.id));
    }
    endTurn();
  };

  const [passDisabled, setPassDisabled] = useState(true);

  useEffect(() => {
    if (view === views.actionPhase) {
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
    view,
    strategyAction.isBeingPlayed,
    currentPlayer,
  ]);

  return { pass, passDisabled };
};

export default usePass;
