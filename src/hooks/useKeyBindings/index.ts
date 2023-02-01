import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import views from "../../global/views";

const useKeyBindings = (props: IPhaseProps) => {
  const { time, handle } = props;
  const { view, races, strategyPhase, agendaPhase } = useSelector(
    (state: RootState) => state
  );

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
