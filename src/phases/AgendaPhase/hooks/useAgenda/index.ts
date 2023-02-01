import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IPhaseProps } from "../../../../types";
import useStartVoting from "./startVoting";
import useStartSecondAgenda from "./startSecondAgenda";
import useEndAgendaPhase from "./endAgendaPhase";

const useAgenda = (props: IPhaseProps) => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  const startVoting = useStartVoting();
  const startSecondAgenda = useStartSecondAgenda();
  const endAgendaPhase = useEndAgendaPhase(props);

  const handleAgendaPhase = () => {
    if (agendaPhase.beforeVoting) {
      startVoting();
    } else if (agendaPhase.round === 1) {
      startSecondAgenda();
    } else {
      endAgendaPhase();
    }
  };

  return handleAgendaPhase;
};

export default useAgenda;
