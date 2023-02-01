import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import AgendaLocked from "./AgendaLocked";
import AgendaNotVoted from "./AgendaNotVoted";
import AgendaVoted from "./AgendaVoted";

const AgendaPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  if (agendaPhase.locked) {
    return <AgendaLocked {...props} />;
  } else if (agendaPhase.isBeingVoted) {
    return <AgendaVoted {...props} />;
  } else {
    return <AgendaNotVoted {...props} />;
  }
};

export default AgendaPhase;
