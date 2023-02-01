import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import ChoosePlayerPanel from "../../panels/ChoosePlayerPanel";
import triggers from "../../global/triggers";
import styles from "./index.module.css";

const ChooseNaalu: FunctionComponent<IPhaseProps> = ({ handle }) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <div className={styles.panelContainer}>
        <ChoosePlayerPanel
          trigger={triggers.naaluTokenChange}
          endPhase={handle.endPhase}
        />
      </div>
    </div>
  );
};

export default ChooseNaalu;
