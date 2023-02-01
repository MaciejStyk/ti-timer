import { FunctionComponent } from "react";
import { IPhaseProps } from "../../../types";
import styles from "./index.module.css";
import MecatolLeft from "./MecatolLeft";
import MecatolRight from "./MecatolRight";

const CustodianPanel: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.container}>
      <MecatolLeft {...props} />
      <MecatolRight />
    </div>
  );
};

export default CustodianPanel;
