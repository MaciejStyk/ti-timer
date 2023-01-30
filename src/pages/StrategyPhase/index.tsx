import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import PauseScreen from "../../components/PauseScreen";
import TopPanel from "../../components/TopPanel";
import LeftPanel from "../../components/LeftPanel";
import AvailableDeck from "../../components/AvailableDeck";
import PlayerPanel from "../../components/PlayerPanel";
import PlayerDeck from "../../components/PlayerDeck";
import BottomPanel from "../../components/BottomPanel";
import ChoosePlayerPanel from "../../components/ChoosePlayerPanel";
import triggers from "../../global/triggers";
import SwapCardsPanel from "../../components/SwapCardsPanel";
import useKeyBindings from "./hooks/useKeyBindings";
import useMove from "./hooks/useMove";
import useAutoDeal from "./hooks/useAutoDeal";
import styles from "./index.module.css";

const StrategyPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { time, handle } = props;
  const { players, playerIndex, races, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];
  const currentPlayerCanPick =
    currentPlayer.strategyCards.length <
    Math.min(strategyPhase.round, strategyPhase.numberOfRounds);

  const move = useMove({ currentPlayer, currentPlayerCanPick });
  useAutoDeal({ currentPlayer, move, handle });
  useKeyBindings({ time, currentPlayer, currentPlayerCanPick, move });

  if (races.naalu.tokenBeingChanged) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <div className={styles.panelContainer}>
          <ChoosePlayerPanel
            trigger={triggers.naaluTokenChange}
            endPhase={handle.endPhase}
          />
        </div>
      </div>
    );
  } else if (strategyPhase.swapCards.isBeingPlayed) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <div className={styles.panelContainer}>
          <SwapCardsPanel endPhase={handle.endPhase} />
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
        {!time.isRunning && <PauseScreen />}
        <TopPanel />

        <AvailableDeck
          move={move}
          currentPlayerCanPick={currentPlayerCanPick}
        />

        <LeftPanel />

        <PlayerPanel time={time} />

        <PlayerDeck
          player={currentPlayer}
          onDrop={(strategyCard) => move.toPlayersDeck(strategyCard)}
          moveToAvailableDeck={move.toAvailableDeck}
          currentPlayerCanPick={currentPlayerCanPick}
        />

        <BottomPanel {...props} />
      </div>
    );
};

export default StrategyPhase;
