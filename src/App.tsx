import { useSelector } from "react-redux";
import { RootState } from "./redux";
import { IPhaseProps } from "./types";
import useTime from "./hooks/useTime";
import useKeyBindings from "./hooks/useKeyBindings";
import useHandlers from "./hooks/useHandlers";
import views from "./global/views";
import SetupPhase from "./pages/SetupPhase";
import StrategyPhase from "./pages/StrategyPhase";
import ActionPhase from "./pages/ActionPhase";
import StatusPhase from "./pages/StatusPhase";
import AgendaPhase from "./pages/AgendaPhase";

const App = () => {
  const { view } = useSelector((state: RootState) => state);

  const time = useTime();
  const handle = useHandlers(time);
  const phaseProps: IPhaseProps = { time, handle };

  useKeyBindings({ time, handle });

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
