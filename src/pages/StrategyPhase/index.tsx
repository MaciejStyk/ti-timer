import { FunctionComponent, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import {
  addStrategyCardToPlayerDeck,
  removeStrategyCardFromPlayerDeck,
} from "../../redux/players";
import {
  addStrategyCardToAvailableDeck,
  removeStrategyCardFromAvailableDeck,
} from "../../redux/strategyPhase";
import { IStrategyCard } from "../../global/strategyCards";
import { IGameProps } from "../../types";
import PauseScreen from "../../components/PauseScreen";
import TopPanel from "../../components/TopPanel";
import LeftPanel from "../../components/LeftPanel";
import AvailableDeck from "../../components/AvailableDeck";
import PlayerPanel from "../../components/PlayerPanel";
import PlayerDeck from "../../components/PlayerDeck";
import BottomPanel from "../../components/BottomPanel";
import styles from "./index.module.css";
import ChoosePlayerPanel from "../../components/ChoosePlayerPanel";
import triggers from "../../global/triggers";
import SwapCardsPanel from "../../components/SwapCardsPanel";

const StrategyPhase: FunctionComponent<IGameProps> = (props) => {
  const {
    isRunning,
    timeDelayed,
    timeElapsed,
    timeBank,
    handlePause,
    handleEndTurn,
    nextTurnDisabled,
    endPhase,
  } = props;
  const { players, strategyPhase, playerIndex, races } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];
  const dispatch = useDispatch();

  const currentPlayerCanPick =
    currentPlayer.strategyCards.length <
    Math.min(strategyPhase.round, strategyPhase.numberOfRounds);

  // ======== MOVE CARDS =======================================================

  const moveToPlayersDeck = useCallback(
    (strategyCard: IStrategyCard) => {
      if (
        !currentPlayer.strategyCards.some(
          (card) => card.id === strategyCard.id
        ) &&
        currentPlayerCanPick
      ) {
        dispatch(
          addStrategyCardToPlayerDeck({
            id: currentPlayer.id,
            strategyCard: strategyCard,
          })
        );
        dispatch(removeStrategyCardFromAvailableDeck(strategyCard));
      }
    },
    [
      currentPlayer.id,
      currentPlayer.strategyCards,
      currentPlayerCanPick,
      dispatch,
    ]
  );

  const moveToAvailableDeck = useCallback(
    (strategyCard: IStrategyCard) => {
      if (
        !strategyPhase.availableStrategyCards.some(
          (card) => card.id === strategyCard.id
        )
      ) {
        dispatch(addStrategyCardToAvailableDeck(strategyCard));
        dispatch(
          removeStrategyCardFromPlayerDeck({
            id: currentPlayer.id,
            strategyCard: strategyCard,
          })
        );
      }
    },
    [currentPlayer.id, dispatch, strategyPhase.availableStrategyCards]
  );

  // ======== DEAL LAST CARD AND END TURN AUTOMATICALLY ========================

  useEffect(() => {
    if (
      strategyPhase.availableStrategyCards.length === 1 &&
      currentPlayer.id === players[players.length - 1].id &&
      players.length !== 7
    ) {
      moveToPlayersDeck(strategyPhase.availableStrategyCards[0]);
      handleEndTurn();
    }
  }, [
    currentPlayer.id,
    handleEndTurn,
    moveToPlayersDeck,
    players,
    strategyPhase.availableStrategyCards,
  ]);

  // ======== KEY BINDINGS =====================================================

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (isRunning && Number(event.key) && Number(event.key) > 0) {
        const cardID = Number(event.key);
        if (
          strategyPhase.availableStrategyCards.some(
            (card) => card.id === cardID
          ) &&
          currentPlayerCanPick
        ) {
          event.preventDefault();
          moveToPlayersDeck(
            strategyPhase.availableStrategyCards.find(
              (card) => card.id === cardID
            )!
          );
        }
        if (
          currentPlayer.strategyCards.some(
            (card, index) =>
              card.id === cardID && index === strategyPhase.round - 1
          )
        ) {
          event.preventDefault();
          moveToAvailableDeck(
            currentPlayer.strategyCards[strategyPhase.round - 1]
          );
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [
    currentPlayer.strategyCards,
    currentPlayerCanPick,
    isRunning,
    moveToAvailableDeck,
    moveToPlayersDeck,
    strategyPhase.availableStrategyCards,
    strategyPhase.round,
  ]);

  // ======== RENDER PAGE ======================================================

  if (races.naalu.tokenBeingChanged) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <div className={styles.panelContainer}>
          <ChoosePlayerPanel
            trigger={triggers.naaluTokenChange}
            endPhase={endPhase}
          />
        </div>
      </div>
    );
  } else if (strategyPhase.swapCards.isBeingPlayed) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <div className={styles.panelContainer}>
          <SwapCardsPanel endPhase={endPhase} />
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
        {!isRunning && <PauseScreen />}
        <TopPanel />

        <AvailableDeck
          moveToPlayersDeck={moveToPlayersDeck}
          moveToAvailableDeck={moveToAvailableDeck}
          currentPlayerCanPick={currentPlayerCanPick}
        />

        <LeftPanel />

        <PlayerPanel
          timeDelayed={timeDelayed}
          timeElapsed={timeElapsed}
          timeBank={timeBank}
        />

        <PlayerDeck
          player={currentPlayer}
          onDrop={(strategyCard) => moveToPlayersDeck(strategyCard)}
          moveToAvailableDeck={moveToAvailableDeck}
          currentPlayerCanPick={currentPlayerCanPick}
        />

        <BottomPanel
          handleEndTurn={handleEndTurn}
          nextTurnDisabled={nextTurnDisabled}
          handlePause={handlePause}
          isRunning={isRunning}
          passDisabled={true}
        />
      </div>
    );
};

export default StrategyPhase;
