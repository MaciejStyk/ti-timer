import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import PausePanel from "../../panels/PausePanel";
import TopPanel from "../../panels/TopPanel";
import LeftPanel from "../../panels/LeftPanel";
import AvailableCardsPanel from "./AvailableCardsPanel";
import PlayerPanel from "../../panels/PlayerPanel";
import PlayerCardsPanel from "../../panels/PlayerCardsPanel";
import BottomPanel from "../../panels/BottomPanel";
import useKeyBindings from "./hooks/useKeyBindings";
import useMove from "./hooks/useMove";
import useAutoDeal from "./hooks/useAutoDeal";
import styles from "./index.module.css";

const DealCards: FunctionComponent<IPhaseProps> = (props) => {
  const { time, handle } = props;
  const { current, players, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[current.playerIndex];
  const currentPlayerCanPick =
    currentPlayer.strategyCards.length <
    Math.min(strategyPhase.round, strategyPhase.numberOfRounds);

  const move = useMove({ currentPlayer, currentPlayerCanPick });
  useAutoDeal({ currentPlayer, move, handle });
  useKeyBindings({ time, currentPlayer, currentPlayerCanPick, move });

  return (
    <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
      {!time.isRunning && <PausePanel />}
      <TopPanel />
      <AvailableCardsPanel
        move={move}
        currentPlayerCanPick={currentPlayerCanPick}
      />
      <LeftPanel />
      <PlayerPanel {...props} />
      <PlayerCardsPanel
        player={currentPlayer}
        onDrop={(strategyCard) => move.toPlayersDeck(strategyCard)}
        moveToAvailableDeck={move.toAvailableDeck}
        currentPlayerCanPick={currentPlayerCanPick}
      />
      <BottomPanel {...props} />
    </div>
  );
};

export default DealCards;
