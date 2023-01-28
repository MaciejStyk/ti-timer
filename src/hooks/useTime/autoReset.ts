import { useEffect } from "react";
import { ITime } from "../../types";
import views from "../../global/views";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

interface IProps {
  time: ITime;
  setInitialBank: React.Dispatch<React.SetStateAction<number>>;
  setDelayEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

const useTimeAutoReset = (props: IProps) => {
  const { time, setInitialBank, setDelayEnded } = props;
  const { view, timer, races, players, playerIndex, strategyPhase, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players.length !== 0 ? players[playerIndex] : null;

  useEffect(() => {
    setInitialBank(
      currentPlayer
        ? currentPlayer.timeBank.min * 60 + currentPlayer.timeBank.sec
        : timer.timeBank.min * 60 + timer.timeBank.sec
    );
    setDelayEnded(false);
    time.delayed.reset();
    time.elapsed.reset();
    time.bank.reset();
    if (
      (view === views.strategyPhase &&
        !races.naalu.tokenBeingChanged &&
        !strategyPhase.swapCards.isBeingPlayed) ||
      view === views.actionPhase ||
      (view === views.agendaPhase && agendaPhase.isBeingVoted)
    ) {
      time.delayed.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    view,
    currentPlayer?.id,
    time.bank.reset,
    time.bank.start,
    agendaPhase.isBeingVoted,
    races.naalu.tokenBeingChanged,
    strategyPhase.swapCards.isBeingPlayed,
  ]);
};

export default useTimeAutoReset;
