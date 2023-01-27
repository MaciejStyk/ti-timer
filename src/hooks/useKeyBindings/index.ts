import { useEffect } from "react";
import views from "../../global/views";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { IRaces } from "../../redux/races";
import { IStrategyPhase } from "../../redux/strategyPhase";
import { IHandle, ITime } from "../../types";

interface IProps {
  view: string;
  time: ITime;
  races: IRaces;
  handle: IHandle;
  strategyPhase: IStrategyPhase;
  agendaPhase: IAgendaPhase;
}

const useKeyBindings = (props: IProps) => {
  const { view, time, races, handle, strategyPhase, agendaPhase } = props;

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        (view === views.strategyPhase &&
          !races.naalu.tokenBeingChanged &&
          !strategyPhase.swapCards.isBeingPlayed) ||
        view === views.actionPhase ||
        (view === views.agendaPhase && agendaPhase.isBeingVoted)
      ) {
        if (
          !event.ctrlKey &&
          (event.code === "Enter" || event.code === "NumpadEnter")
        ) {
          if (!handle.endTurnDisabled) {
            event.preventDefault();
            handle.endTurn();
          }
        }
        if (event.code === "Space") {
          event.preventDefault();
          handle.pause();
        }
      }
      if (view === views.actionPhase && !handle.passDisabled) {
        if (event.ctrlKey && event.code === "Enter") {
          event.preventDefault();
          handle.pass();
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [
    view,
    time.isRunning,
    races.naalu.tokenBeingChanged,
    strategyPhase.swapCards.isBeingPlayed,
    agendaPhase.isBeingVoted,
    handle,
  ]);
};

export default useKeyBindings;
