import { useState, useEffect, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import styles from "./index.module.css";

const BottomPanel: FunctionComponent<IPhaseProps> = (props) => {
  const { time, handle } = props;
  const { choosePlayerAction } = useSelector((state: RootState) => state);

  const [hover, setHover] = useState<{
    pass: boolean;
    pause: boolean;
    endTurn: boolean;
  }>({
    pass: false,
    pause: false,
    endTurn: false,
  });

  useEffect(() => {
    setHover({ pass: false, pause: false, endTurn: false });
  }, [handle.passDisabled, time.isRunning, handle.endTurnDisabled]);

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.bottomPanel}>
      <button
        className={handle.passDisabled ? styles.disabledButton : styles.actionButton}
        disabled={handle.passDisabled}
        onDoubleClick={handle.pass}
        onMouseEnter={() =>
          setHover((prevState) => ({ ...prevState, pass: true }))
        }
        onMouseLeave={() =>
          setHover((prevState) => ({ ...prevState, pass: false }))
        }
      >
        {hover.pass ? (
          <span className={styles.smallerFont}>Double click to pass</span>
        ) : (
          "Pass"
        )}
      </button>

      <button
        className={styles.actionButton}
        onClick={handle.pause}
        onMouseEnter={() =>
          setHover((prevState) => ({ ...prevState, pause: true }))
        }
        onMouseLeave={() =>
          setHover((prevState) => ({ ...prevState, pause: false }))
        }
      >
        {hover.pause ? (
          <span className={styles.smallerFont}>
            Press space to {time.isRunning ? "pause" : "resume"}
          </span>
        ) : (
          <span>{time.isRunning ? "pause" : "resume"}</span>
        )}
      </button>

      <button
        className={
          handle.endTurnDisabled ? styles.disabledButton : styles.actionButton
        }
        disabled={handle.endTurnDisabled}
        onClick={handle.endTurn}
        onMouseEnter={() =>
          setHover((prevState) => ({ ...prevState, endTurn: true }))
        }
        onMouseLeave={() =>
          setHover((prevState) => ({ ...prevState, endTurn: false }))
        }
      >
        {hover.endTurn ? (
          <span className={styles.smallerFont}>Press enter to end turn</span>
        ) : choosePlayerAction.playable ? (
          <span className={styles.smallerFont}>Change speaker first</span>
        ) : (
          "End turn"
        )}
      </button>
    </div>
  );
};

export default BottomPanel;
