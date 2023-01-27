import { useEffect } from "react";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { IPlayer } from "../../redux/players";
import { IRaces } from "../../redux/races";
import { IStrategyPhase } from "../../redux/strategyPhase";
import { ITimer } from "../../redux/timer";
import { ITime } from "../../types";
import views from "../../global/views";

interface IProps {
  view: string;
  time: ITime;
  races: IRaces;
  timer: ITimer;
  currentPlayer: IPlayer | null;
  strategyPhase: IStrategyPhase;
  agendaPhase: IAgendaPhase;
  setInitialTimeBank: React.Dispatch<React.SetStateAction<number>>;
  setDelayTimeHasEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

const useTimeAutoReset = (props: IProps) => {
  const {
    view,
    time,
    races,
    timer,
    currentPlayer,
    strategyPhase,
    agendaPhase,
    setInitialTimeBank,
    setDelayTimeHasEnded,
  } = props;

  useEffect(() => {
    setInitialTimeBank(
      currentPlayer
        ? currentPlayer.timeBank.min * 60 + currentPlayer.timeBank.sec
        : timer.timeBank.min * 60 + timer.timeBank.sec
    );
    setDelayTimeHasEnded(false);
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
