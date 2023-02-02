import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import ChoosePlayerPanel from "../../panels/ChoosePlayerPanel";
import styles from "./index.module.css";

const ChooseNaalu: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <div className={styles.panelContainer}>
        <ChoosePlayerPanel {...props} />
      </div>
    </div>
  );
};

export default ChooseNaalu;
