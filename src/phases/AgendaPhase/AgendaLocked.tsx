import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import CustodianPanel from "./CustodianPanel";
import styles from "./index.module.css";

const AgendaLocked: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <CustodianPanel {...props} />
    </div>
  );
};

export default AgendaLocked;
