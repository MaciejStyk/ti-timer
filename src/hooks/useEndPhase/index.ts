import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import views from "../../global/views";
import useEndActionPhase from "./actionPhase";
import useEndAgendaPhase from "./agendaPhase";
import useEndSetupPhase from "./setupPhase";
import useEndStatusPhase from "./statusPhase";
import useEndStrategyPhase from "./strategyPhase";

const useEndPhase = () => {
  const { view } = useSelector((state: RootState) => state);

  const endSetupPhase = useEndSetupPhase();
  const endStrategyPhase = useEndStrategyPhase();
  const endActionPhase = useEndActionPhase();
  const endStatusPhase = useEndStatusPhase();
  const endAgendaPhase = useEndAgendaPhase();

  const endPhase = () => {
    switch (view) {
      case views.setupPhase:
        endSetupPhase();
        break;
      case views.strategyPhase:
        endStrategyPhase();
        break;
      case views.actionPhase:
        endActionPhase();
        break;
      case views.statusPhase:
        endStatusPhase();
        break;
      case views.agendaPhase:
        endAgendaPhase();
        break;
    }
  };

  return endPhase;
};

export default useEndPhase;
