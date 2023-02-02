import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import triggers from "../../global/triggers";
import useCancel from "./hooks/useCancel";
import useAccept from "./hooks/useAccept";
import styles from "./index.module.css";

const ChoosePlayerPanel: FunctionComponent<IPhaseProps> = (props) => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const { trigger, chosenPlayer } = choosePlayerAction;

  const handleCancel = useCancel();
  const handleAccept = useAccept(props);

  return (
    <div className={styles.buttonContainer}>
      {trigger !== triggers.naaluTokenChange && (
        <button className={styles.button} onClick={handleCancel}>
          Cancel
        </button>
      )}

      <button
        className={chosenPlayer ? styles.button : styles.disabledButton}
        onClick={handleAccept}
      >
        {trigger === triggers.naaluTokenChange ? "Next phase" : "Accept"}
      </button>
    </div>
  );
};

export default ChoosePlayerPanel;
