import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import PlayerForm from "../../components/PlayerForm";
import PlayersList from "../../components/PlayersList";
import SettingsForm from "../../components/SettingsForm";
import styles from "./index.module.css";

const SetupPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { handle } = props;
  const { players, races } = useSelector((state: RootState) => state);

  const numberOfPlayersCheck = players.length >= 3;
  const argentCheck =
    races.argent.inGame === (races.argent.playedBy ? true : false);
  const canStartGame = numberOfPlayersCheck && argentCheck;

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
          className={canStartGame ? styles.actionButton : styles.disabledButton}
          onClick={() => {
            if (canStartGame) handle.endPhase();
          }}
        >
          {numberOfPlayersCheck
            ? argentCheck
              ? "Start game"
              : "Choose argent player"
            : "Min 3 players"}
        </button>
      </div>
    </div>
  );
};

export default SetupPhase;
