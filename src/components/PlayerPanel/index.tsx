import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import views from "../../global/views";
import RenderTime from "../RenderTime";
import cn from "classnames";
import styles from "./index.module.css";

interface IPlayerPanel {
  timeDelayed: number;
  timeElapsed: number;
  timeBank: number;
}

const PlayerPanel: FunctionComponent<IPlayerPanel> = (props) => {
  const { timeDelayed, timeElapsed, timeBank } = props;
  const { players, view, playerIndex, strategyAction, agendaPhase } =
    useSelector((state: RootState) => state);
  const currentPlayer = players[playerIndex];

  // ======== CLASSES ==========================================================

  const playerPanelClasses = cn({
    [styles.playerPanel]: true,
    [styles.playerPanelActionPhase]: view === views.actionPhase,
    [styles.playerPanelStrategyAction]: strategyAction.isBeingPlayed,
  });

  const playerNameClasses = cn({
    [styles.playerName]: true,
    [styles.playerNameStrategyAction]: strategyAction.isBeingPlayed,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={playerPanelClasses}>
      <div className={playerNameClasses}>{currentPlayer.name}</div>
      <div className={styles.timeBankLeft}>
        <span>
          {agendaPhase.isBeingVoted ? "Voting" : "Turn"}{" "}
          {timeDelayed === 0 ? "time" : "starts in"}
        </span>
        <div className={styles.timer}>
          <RenderTime time={timeDelayed === 0 ? timeElapsed : timeDelayed} />
        </div>
      </div>
      <div className={styles.timeBankRight}>
        <span>Time bank</span>
        <div className={styles.timer}>
          <RenderTime time={timeBank} />
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
