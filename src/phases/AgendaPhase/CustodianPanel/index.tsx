import { FunctionComponent } from "react";
import { IPhaseProps } from "../../../types";
import MecatolLeft from "./MecatolLeft";
import MecatolRight from "./MecatolRight";
import styles from "./index.module.css";

const CustodianPanel: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.container}>
      <MecatolLeft {...props} />
      <MecatolRight />
    </div>
  );
};

export default CustodianPanel;
