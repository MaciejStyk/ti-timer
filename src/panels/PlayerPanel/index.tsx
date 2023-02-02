import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import views from "../../global/views";
import PlayerName from "./PlayerName";
import TimeBankLeft from "./TimeBankLeft";
import TimeBankRight from "./TimeBankRight";
import cn from "classnames";
import styles from "./index.module.css";

const PlayerPanel: FunctionComponent<IPhaseProps> = ({ time }) => {
  const { current, strategyAction } = useSelector((state: RootState) => state);

  const playerPanelClasses = cn({
    [styles.playerPanel]: true,
    [styles.playerPanelActionPhase]: current.view === views.actionPhase,
    [styles.playerPanelStrategyAction]: strategyAction.isBeingPlayed,
  });

  return (
    <div className={playerPanelClasses}>
      <PlayerName />
      <TimeBankLeft time={time} />
      <TimeBankRight time={time} />
    </div>
  );
};

export default PlayerPanel;
