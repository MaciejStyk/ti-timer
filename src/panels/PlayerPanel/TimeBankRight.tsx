import { FunctionComponent } from "react";
import { ITime } from "../../types";
import RenderTime from "../../components/RenderTime";
import styles from "./index.module.css";

const TimeBankLeft: FunctionComponent<{ time: ITime }> = ({ time }) => {
  return (
    <div className={styles.timeBankRight}>
      <span>Time bank</span>
      <div className={styles.timer}>
        <RenderTime time={time.bank.value} />
      </div>
    </div>
  );
};

export default TimeBankLeft;
