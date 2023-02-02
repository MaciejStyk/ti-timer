import { useState, useEffect, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import styles from "./index.module.css";

const ButtonRight: FunctionComponent<IPhaseProps> = ({ handle }) => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setHover(false);
  }, [handle.endTurnDisabled]);

  return (
    <button
      className={
        handle.endTurnDisabled ? styles.disabledButton : styles.actionButton
      }
      disabled={handle.endTurnDisabled}
      onClick={handle.endTurn}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <span className={styles.smallerFont}>Press enter to end turn</span>
      ) : choosePlayerAction.playable ? (
        <span className={styles.smallerFont}>Change speaker first</span>
      ) : (
        "End turn"
      )}
    </button>
  );
};

export default ButtonRight;
