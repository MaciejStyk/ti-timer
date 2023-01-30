import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import useKeyBindings from "./hooks/useKeyBindings";
import useStrategyAction from "./hooks/useStrategyAction";
import PauseScreen from "../../components/PauseScreen";
import TopPanel from "../../components/TopPanel";
import LeftPanel from "../../components/LeftPanel";
import PlayerPanel from "../../components/PlayerPanel";
import BottomPanel from "../../components/BottomPanel";
import styles from "./index.module.css";
import PlayerDeck from "../../components/PlayerDeck";
import StrategyAction from "../../components/StrategyAction";

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
        <StrategyAction {...props} />
      </div>
    );
  else
    return (
      <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
        {!time.isRunning && <PauseScreen />}
        <TopPanel />
        <LeftPanel />
        <PlayerPanel time={time} />
        <PlayerDeck
          player={currentPlayer}
          makeStrategyAction={makeStrategyAction}
        />
        <BottomPanel {...props} />
      </div>
    );
};

export default ActionPhase;
