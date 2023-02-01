import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import PlayersList from "./PlayersList";
import StepsList from "./StepsList";
import styles from "./index.module.css";

const StatusPhase: FunctionComponent<IPhaseProps> = ({ handle }) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <PlayersList />
          <StepsList />
        </div>
        <button className={styles.endPhaseButton} onClick={handle.endPhase}>
          Next phase
        </button>
      </div>
    </div>
  );
};

export default StatusPhase;
