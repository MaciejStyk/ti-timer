import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import useKeyBindings from "./hooks/useKeyBindings";
import useStrategyAction from "./hooks/useStrategyAction";
import PausePanel from "../../panels/PausePanel";
import TopPanel from "../../panels/TopPanel";
import LeftPanel from "../../panels/LeftPanel";
import PlayerPanel from "../../panels/PlayerPanel";
import BottomPanel from "../../panels/BottomPanel";
import styles from "./index.module.css";
import PlayerDeckPanel from "../../panels/PlayerDeckPanel";
import StrategyActionPanel from "../../panels/StrategyActionPanel";

const ActionPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { time } = props;
  const { players, playerIndex, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];

  const makeStrategyAction = useStrategyAction(currentPlayer);
  useKeyBindings({ time, currentPlayer, makeStrategyAction });

  if (strategyAction.isBeingPlayed)
    return (
      <div
        className={styles.fullScreenContainer}
        style={strategyAction.playedBy?.theme}
      >
        <StrategyActionPanel {...props} />
      </div>
    );
  else
    return (
      <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
        {!time.isRunning && <PausePanel />}
        <TopPanel />
        <LeftPanel />
        <PlayerPanel {...props} />
        <PlayerDeckPanel
          player={currentPlayer}
          makeStrategyAction={makeStrategyAction}
        />
        <BottomPanel {...props} />
      </div>
    );
};

export default ActionPhase;
