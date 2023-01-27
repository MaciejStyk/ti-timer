import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import { IStrategyCard } from "../../global/strategyCards";
import { playStrategyAction } from "../../redux/strategyAction";
import {
  exhaustStrategyCardAtPlayerDeck,
  reorderPlayers,
} from "../../redux/players";
import { setChoosePlayerAction } from "../../redux/choosePlayerAction";
import { setPlayerIndex } from "../../redux/playerIndex";
import PauseScreen from "../../components/PauseScreen";
import TopPanel from "../../components/TopPanel";
import LeftPanel from "../../components/LeftPanel";
import PlayerPanel from "../../components/PlayerPanel";
import BottomPanel from "../../components/BottomPanel";
import styles from "./index.module.css";
import PlayerDeck from "../../components/PlayerDeck";
import StrategyAction from "../../components/StrategyAction";

const ActionPhase: FunctionComponent<IPhaseProps> = (props) => {
  const {
    time,
    handlePause,
    handleEndTurn,
    endTurnDisabled,
    handlePass,
    passDisabled,
  } = props;
  const { players, playerIndex, tableOrder, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];
  const dispatch = useDispatch();

  // ======== STRATEGY ACTION  =================================================

  const makeStrategyAction = useCallback(
    (strategyCard: IStrategyCard) => {
      if (!strategyCard.exhausted) {
        dispatch(
          playStrategyAction({
            isBeingPlayed: true,
            playedBy: currentPlayer,
            strategyCard: strategyCard,
          })
        );
        if (strategyCard.id === 3) {
          dispatch(
            setChoosePlayerAction({
              playable: true,
              isBeingPlayed: false,
            })
          );
        }
        dispatch(
          exhaustStrategyCardAtPlayerDeck({
            id: currentPlayer.id,
            strategyCard: strategyCard,
          })
        );
        dispatch(
          reorderPlayers({
            startingPlayer: currentPlayer,
            order: tableOrder,
          })
        );
        dispatch(setPlayerIndex(0));
      }
    },
    [currentPlayer, dispatch, tableOrder]
  );

  // ======== KEY BINDINGS =====================================================

  const [firstPress, setFirstPress] = useState({
    id: 0,
    pressed: false,
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (time.isRunning && Number(event.key) && Number(event.key) > 0) {
        const cardID = Number(event.key);
        if (
          currentPlayer.strategyCards.some(
            (card) => card.id === cardID && !card.exhausted
          ) &&
          !strategyAction.isBeingPlayed
        ) {
          if (firstPress.pressed && firstPress.id === cardID) {
            event.preventDefault();
            makeStrategyAction(
              currentPlayer.strategyCards.find((card) => card.id === cardID)!
            );
            setFirstPress({
              id: 0,
              pressed: false,
            });
          } else {
            setFirstPress({
              id: cardID,
              pressed: true,
            });
            window.setTimeout(function () {
              setFirstPress({
                id: 0,
                pressed: false,
              });
            }, 500);
          }
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [
    currentPlayer.strategyCards,
    firstPress,
    time.isRunning,
    makeStrategyAction,
    strategyAction.isBeingPlayed,
  ]);

  // ======== RENDER PAGE ======================================================

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

        <BottomPanel
          time={time}
          handlePause={handlePause}
          handleEndTurn={handleEndTurn}
          endTurnDisabled={endTurnDisabled}
          handlePass={handlePass}
          passDisabled={passDisabled}
        />
      </div>
    );
};

export default ActionPhase;
