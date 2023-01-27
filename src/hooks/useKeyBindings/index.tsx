import { useEffect } from "react";
import views from "../../global/views";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { IRaces } from "../../redux/races";
import { IStrategyPhase } from "../../redux/strategyPhase";
import { ITime } from "../../types";

interface IProps {
  view: string;
  time: ITime;
  races: IRaces;
  handleEndTurn: () => void;
  endTurnDisabled: boolean;
  handlePause: () => void;
  handlePass: () => void;
  passDisabled: boolean;
  strategyPhase: IStrategyPhase;
  agendaPhase: IAgendaPhase;
}

const useKeyBindings = (props: IProps) => {
  const {
    view,
    time,
    races,
    handleEndTurn,
    endTurnDisabled,
    handlePause,
    handlePass,
    passDisabled,
    strategyPhase,
    agendaPhase,
  } = props;

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
          if (!endTurnDisabled) {
            event.preventDefault();
            handleEndTurn();
          }
        }
        if (event.code === "Space") {
          event.preventDefault();
          handlePause();
        }
      }
      if (view === views.actionPhase && !passDisabled) {
        if (event.ctrlKey && event.code === "Enter") {
          event.preventDefault();
          handlePass();
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
    handleEndTurn,
    endTurnDisabled,
    handlePause,
    handlePass,
    passDisabled,
    strategyPhase.swapCards.isBeingPlayed,
    agendaPhase.isBeingVoted,
  ]);
};

export default useKeyBindings;
