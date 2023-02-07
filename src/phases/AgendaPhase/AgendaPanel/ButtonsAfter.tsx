import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import useButtons from "../hooks/useButtons";
import useAgenda from "../hooks/useAgenda";
import styles from "./index.module.css";

const ButtonsAfter: FunctionComponent<IPhaseProps> = (props) => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  const { handlePoliticsRider, handlePublicExecution } = useButtons();
  const handleAgendaPhase = useAgenda(props);

  return (
    <div className={styles.buttonContainer}>
      {!agendaPhase.appliedEffects.politicsRider && (
        <button className={styles.button} onClick={handlePoliticsRider}>
          Politics Rider
        </button>
      )}

      {!agendaPhase.appliedEffects.publicExecution && (
        <button className={styles.button} onClick={handlePublicExecution}>
          Public execution
        </button>
      )}

      <button className={styles.button} onClick={handleAgendaPhase}>
        {agendaPhase.round === 1 ? "Second agenda" : "Next round"}
      </button>
    </div>
  );
};

export default ButtonsAfter;
