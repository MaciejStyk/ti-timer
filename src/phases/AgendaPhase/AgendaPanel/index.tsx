import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import ChoosePlayerPanel from "../../../panels/ChoosePlayerPanel";
import SpeakerBar from "./SpeakerBar";
import StepsList from "./StepsList";
import ButtonsBefore from "./ButtonsBefore";
import ButtonsAfter from "./ButtonsAfter";
import styles from "./index.module.css";

const AgendaPanel: FunctionComponent<IPhaseProps> = (props) => {
  const { agendaPhase, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );

  if (choosePlayerAction.isBeingPlayed) {
    return (
      <div className={styles.container}>
        <ChoosePlayerPanel {...props} />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <SpeakerBar />
        <StepsList />

        {agendaPhase.beforeVoting ? (
          <ButtonsBefore {...props} />
        ) : (
          <ButtonsAfter {...props} />
        )}
      </div>
    );
  }
};

export default AgendaPanel;
