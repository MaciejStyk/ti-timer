import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { IPhaseProps } from "../types";
import views from "../global/views";
import SetupPhase from "./SetupPhase";
import StrategyPhase from "./StrategyPhase";
import ActionPhase from "./ActionPhase";
import StatusPhase from "./StatusPhase";
import AgendaPhase from "./AgendaPhase";

const RenderApp = (phaseProps: IPhaseProps) => {
  const { view } = useSelector((state: RootState) => state);

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

export default RenderApp;
