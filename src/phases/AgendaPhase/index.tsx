import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import AgendaLocked from "./AgendaLocked";
import AgendaNotVoted from "./AgendaNotVoted";
import AgendaVoted from "./AgendaVoted";

const AgendaPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  if (!agendaPhase.unlocked) {
    return <AgendaLocked {...props} />;
  } else if (!agendaPhase.isBeingVoted) {
    return <AgendaNotVoted {...props} />;
  } else {
    return <AgendaVoted {...props} />;
  }
};

export default AgendaPhase;
