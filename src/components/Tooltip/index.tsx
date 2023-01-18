import { FunctionComponent } from "react";
import styles from "./index.module.css";

interface Props {
  number: number;
}

const Tooltip: FunctionComponent<Props> = (props) => {
  const { number } = props;

  return (
    <div className={styles.tooltip}>
      Double press {number} or double click <br /> to play strategy action{" "}
    </div>
  );
};

export default Tooltip;
