import { useState, useEffect, FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import styles from "./index.module.css";

const ButtonLeft: FunctionComponent<IPhaseProps> = ({ handle }) => {
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setHover(false);
  }, [handle.passDisabled]);

  return (
    <button
      className={
        handle.passDisabled ? styles.disabledButton : styles.actionButton
      }
      disabled={handle.passDisabled}
      onDoubleClick={handle.pass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <span className={styles.smallerFont}>Double click to pass</span>
      ) : (
        "Pass"
      )}
    </button>
  );
};

export default ButtonLeft;
