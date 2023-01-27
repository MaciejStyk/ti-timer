import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux";
import { IPhaseProps } from "./types";
import views from "./global/views";
import SetupPhase from "./pages/SetupPhase";
import StrategyPhase from "./pages/StrategyPhase";
import ActionPhase from "./pages/ActionPhase";
import StatusPhase from "./pages/StatusPhase";
import AgendaPhase from "./pages/AgendaPhase";
import useTime from "./hooks/useTime";
import useKeyBindings from "./hooks/useKeyBindings";
import useHandlers from "./hooks/useHandlers";
import useTimeAutoReset from "./hooks/useTimeAutoReset";

const App = () => {
  const {
    view,
    players,
    timer,
    tableOrder,
    roundOrder,
    playerIndex,
    strategyAction,
    races,
    strategyPhase,
    agendaPhase,
    choosePlayerAction,
  } = useSelector((state: RootState) => state);
  const currentPlayer = players.length !== 0 ? players[playerIndex] : null;

  // ======== TIMER ============================================================

  const [delayTimeHasEnded, setDelayTimeHasEnded] = useState(false);
  const [initialTimeBank, setInitialTimeBank] = useState(
    timer.timeBank.min * 60 + timer.timeBank.sec
  );

  const time = useTime({
    timer,
    delayTimeHasEnded,
    setDelayTimeHasEnded,
    initialTimeBank,
  });

  useTimeAutoReset({
    view,
    time,
    races,
    timer,
    currentPlayer,
    strategyPhase,
    agendaPhase,
    setInitialTimeBank,
    setDelayTimeHasEnded,
  });

  // ======== HANDLERS  ========================================================

  const handle = useHandlers({
    time,
    view,
    players,
    timer,
    races,
    playerIndex,
    currentPlayer,
    roundOrder,
    tableOrder,
    agendaPhase,
    strategyPhase,
    strategyAction,
    choosePlayerAction,
  });

  // ======== KEY BINDINGS =====================================================

  useKeyBindings({
    view,
    time,
    races,
    handle,
    strategyPhase,
    agendaPhase,
  });

  // ======== RENDER APP =======================================================

  const phaseProps: IPhaseProps = { time, handle };

  const renderApp = () => {
    switch (view) {
      case views.setupPhase:
        return <SetupPhase {...phaseProps} />;
      case views.strategyPhase:
        return <StrategyPhase {...phaseProps} />;
      case views.actionPhase:
        return <ActionPhase {...phaseProps} />;
      case views.statusPhase:
        return <StatusPhase {...phaseProps} />;
      case views.agendaPhase:
        return <AgendaPhase {...phaseProps} />;
    }
  };

  return <>{renderApp()}</>;
};

export default App;
