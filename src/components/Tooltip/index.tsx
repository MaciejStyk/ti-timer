import { FunctionComponent } from "react";
import styles from "./index.module.css";

const Tooltip: FunctionComponent<{ number: number }> = ({ number }) => {
  return (
    <div className={styles.tooltip}>
      Double press {number} or double click <br /> to play strategy action{" "}
    </div>
  );
};

export default Tooltip;
