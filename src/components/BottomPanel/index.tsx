import { useState, useEffect, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { ITime } from "../../types";
import styles from "./index.module.css";

interface IBottomPanel {
  time: ITime;
  handlePause: () => void;
  handleEndTurn: () => void;
  endTurnDisabled: boolean;
  handlePass?: () => void;
  passDisabled: boolean;
}

const BottomPanel: FunctionComponent<IBottomPanel> = (props) => {
  const {
    handleEndTurn,
    endTurnDisabled,
    handlePause,
    time,
    handlePass,
    passDisabled,
  } = props;
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
  }, [passDisabled, time.isRunning, endTurnDisabled]);

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.bottomPanel}>
      <button
        className={passDisabled ? styles.disabledButton : styles.actionButton}
        disabled={passDisabled}
        onDoubleClick={handlePass}
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
        onClick={handlePause}
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
          endTurnDisabled ? styles.disabledButton : styles.actionButton
        }
        disabled={endTurnDisabled}
        onClick={handleEndTurn}
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
