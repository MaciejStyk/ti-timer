import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import PlayerForm from "./PlayerForm";
import PlayersList from "./PlayersList";
import SettingsForm from "./SettingsForm";
import useCheck from "./hooks/useCheck";
import styles from "./index.module.css";

const SetupPhase: FunctionComponent<IPhaseProps> = ({ handle }) => {
  const check = useCheck();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Game Setup</h1>
        <p>
          Add players and set them in a clock-wise order starting from the
          speaker
        </p>

        <PlayerForm />
        <PlayersList />
        <SettingsForm />

        <button
          className={
            check.gameStart ? styles.actionButton : styles.disabledButton
          }
          onClick={() => {
            if (check.gameStart) handle.endPhase();
          }}
        >
          {check.playersNumber
            ? check.argent
              ? "Start game"
              : "Choose argent player"
            : "Min 3 players"}
        </button>
      </div>
    </div>
  );
};

export default SetupPhase;
