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
  const {
    current,
    timer,
    races,
    players,
    playerIndex,
    strategyPhase,
    agendaPhase,
  } = useSelector((state: RootState) => state);
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
      (current.view === views.strategyPhase &&
        !races.naalu.tokenBeingChanged &&
        !strategyPhase.swapCards.isBeingPlayed) ||
      current.view === views.actionPhase ||
      (current.view === views.agendaPhase && agendaPhase.isBeingVoted)
    ) {
      time.delayed.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    current.view,
    currentPlayer?.id,
    time.bank.reset,
    time.bank.start,
    agendaPhase.isBeingVoted,
    races.naalu.tokenBeingChanged,
    strategyPhase.swapCards.isBeingPlayed,
  ]);
};

export default useTimeAutoReset;
