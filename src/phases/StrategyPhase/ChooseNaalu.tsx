import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import ChoosePlayerPanel from "../../panels/ChoosePlayerPanel";
import styles from "./index.module.css";

const ChooseNaalu: FunctionComponent<IPhaseProps> = ({ handle }) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <div className={styles.panelContainer}>
        <ChoosePlayerPanel endPhase={handle.endPhase} />
      </div>
    </div>
  );
};

export default ChooseNaalu;
