import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import useAgenda from "../hooks/useAgenda";
import cn from "classnames";
import styles from "./index.module.css";

const ButtonsBefore: FunctionComponent<IPhaseProps> = (props) => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  const { handleAgendaPhase, handleHackElection } = useAgenda({ ...props });

  const hackElectionButtonClasses = cn({
    [styles.button]: true,
    [styles.wider]: true,
    [styles.active]: agendaPhase.appliedEffects.hackElection,
  });

  return (
    <div className={styles.buttonContainer}>
      <button
        className={hackElectionButtonClasses}
        onClick={handleHackElection}
      >
        {agendaPhase.appliedEffects.hackElection
          ? "Election hacked"
          : "Hack Election"}
      </button>

      <button className={styles.button} onClick={handleAgendaPhase}>
        Begin voting
      </button>
    </div>
  );
};

export default ButtonsBefore;
