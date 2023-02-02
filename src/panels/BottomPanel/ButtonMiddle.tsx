import { useState, useEffect, FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import styles from "./index.module.css";

const ButtonMiddle: FunctionComponent<IPhaseProps> = (props) => {
  const { time, handle } = props;
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setHover(false);
  }, [time.isRunning]);

  return (
    <button
      className={styles.actionButton}
      onClick={handle.pause}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <span className={styles.smallerFont}>
          Press space to {time.isRunning ? "pause" : "resume"}
        </span>
      ) : (
        <span>{time.isRunning ? "pause" : "resume"}</span>
      )}
    </button>
  );
};

export default ButtonMiddle;
