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
import PlayerCardsPanel from "../../panels/PlayerCardsPanel";
import styles from "./index.module.css";

const NormalAction: FunctionComponent<IPhaseProps> = (props) => {
  const { time } = props;
  const { players, playerIndex } = useSelector((state: RootState) => state);
  const currentPlayer = players[playerIndex];

  const makeStrategyAction = useStrategyAction(currentPlayer);
  useKeyBindings({ time, currentPlayer, makeStrategyAction });

  return (
    <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
      {!time.isRunning && <PausePanel />}
      <TopPanel />
      <LeftPanel />
      <PlayerPanel {...props} />
      <PlayerCardsPanel
        player={currentPlayer}
        makeStrategyAction={makeStrategyAction}
      />
      <BottomPanel {...props} />
    </div>
  );
};

export default NormalAction;
