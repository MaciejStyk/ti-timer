import { useDispatch } from "react-redux";
import {
  resetAgendaRound,
  resetAppliedEffects,
} from "../../../../redux/agendaPhase";
import { IPhaseProps } from "../../../../types";

const useEndAgendaPhase = (props: IPhaseProps) => {
  const { handle } = props;
  const dispatch = useDispatch();

  const endAgendaPhase = () => {
    dispatch(resetAppliedEffects());
    dispatch(resetAgendaRound());
    handle.endPhase();
  };

  return endAgendaPhase;
};

export default useEndAgendaPhase;
