import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import ButtonLeft from "./ButtonLeft";
import ButtonMiddle from "./ButtonMiddle";
import ButtonRight from "./ButtonRight";
import styles from "./index.module.css";

const BottomPanel: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.bottomPanel}>
      <ButtonLeft {...props} />
      <ButtonMiddle {...props} />
      <ButtonRight {...props} />
    </div>
  );
};

export default BottomPanel;
