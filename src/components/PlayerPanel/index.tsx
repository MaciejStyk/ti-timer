import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { ITime } from "../../types";
import views from "../../global/views";
import RenderTime from "../RenderTime";
import cn from "classnames";
import styles from "./index.module.css";

interface IPlayerPanel {
  time: ITime;
}

const PlayerPanel: FunctionComponent<IPlayerPanel> = ({ time }) => {
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
          {time.delayed.value === 0 ? "time" : "starts in"}
        </span>
        <div className={styles.timer}>
          <RenderTime
            time={
              time.delayed.value === 0 ? time.elapsed.value : time.delayed.value
            }
          />
        </div>
      </div>
      <div className={styles.timeBankRight}>
        <span>Time bank</span>
        <div className={styles.timer}>
          <RenderTime time={time.bank.value} />
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
