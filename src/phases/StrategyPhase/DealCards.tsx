import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import useMove from "./hooks/useMove";
import useAutoDeal from "./hooks/useAutoDeal";
import useKeyBindings from "./hooks/useKeyBindings";
import PausePanel from "../../panels/PausePanel";
import TopPanel from "../../panels/TopPanel";
import AvailableCardsPanel from "./AvailableCardsPanel";
import LeftPanel from "../../panels/LeftPanel";
import PlayerPanel from "../../panels/PlayerPanel";
import PlayerCardsPanel from "../../panels/PlayerCardsPanel";
import BottomPanel from "../../panels/BottomPanel";
import styles from "./index.module.css";

const DealCards: FunctionComponent<IPhaseProps> = (props) => {
  const { time, handle } = props;
  const { currentPlayer } = useCurrentPlayer();

  const move = useMove();
  useAutoDeal({ handle, move });
  useKeyBindings({ time, move });

  return (
    <div className={styles.fullScreenContainer} style={currentPlayer?.theme}>
      {!time.isRunning && <PausePanel />}
      <TopPanel />
      <AvailableCardsPanel move={move} />
      <LeftPanel />
      <PlayerPanel {...props} />
      <PlayerCardsPanel
        player={currentPlayer}
        onDrop={(strategyCard) => move.toPlayersDeck(strategyCard)}
      />
      <BottomPanel {...props} />
    </div>
  );
};

export default DealCards;
