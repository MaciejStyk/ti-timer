import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import {
  addStrategyCardToPlayerDeck,
  addStrategyCardToPlayerDeckFront,
  removeStrategyCardFromPlayerDeck,
} from "../../../redux/reducers/players";
import {
  setSwapCardsBeingPlayed,
  setSwapCardsPlayable,
  switchSwapCardsStage,
} from "../../../redux/reducers/strategyPhase";
import { setNaaluTokenBeingChanged } from "../../../redux/reducers/settings/races";
import { IStrategyCard } from "../../../global/strategyCards";
import { IPhaseProps } from "../../../types";
import PlayerCardsPanel from "../../../panels/PlayerCardsPanel";
import cn from "classnames";
import styles from "./index.module.css";
import { setChoosePlayerAction } from "../../../redux/reducers/choosePlayerAction";
import triggers from "../../../global/triggers";

const SwapCardsPanel: FunctionComponent<IPhaseProps> = ({ handle }) => {
  const { settings, players, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const beforeSwap = strategyPhase.swapCards.beforeSwap;

  // ======== MOVE CARDS =======================================================

  const [swappedCardID, setSwappedCardID] = useState<number | null>(null);

  const updateSwappedCardID = (event: any) => {
    if (event.target.tagName === "IMG") {
      setSwappedCardID(+event.target.id);
    } else {
      setSwappedCardID(null);
    }
  };

  const moveBetweenPlayersDeck = (
    draggedStrategyCard: IStrategyCard,
    newOwnerIndex: number
  ) => {
    const formerCardOwner = players.find((player) =>
      player.strategyCards.some((card) => card.id === draggedStrategyCard.id)
    )!;
    const newCardOwner = players[newOwnerIndex];
    const draggedCardIndex = formerCardOwner.strategyCards.findIndex(
      (card) => card.id === draggedStrategyCard.id
    );

    if (formerCardOwner.id !== newCardOwner.id) {
      if (players.length < 5) {
        if (swappedCardID) {
          const swappedCard = newCardOwner.strategyCards.find(
            (card) => card.id === swappedCardID
          );
          const swappedCardIndex = newCardOwner.strategyCards.findIndex(
            (card) => card.id === swappedCardID
          );

          dispatch(
            removeStrategyCardFromPlayerDeck({
              id: formerCardOwner.id,
              strategyCard: draggedStrategyCard,
            })
          );
          dispatch(
            removeStrategyCardFromPlayerDeck({
              id: newCardOwner.id,
              strategyCard: swappedCard!,
            })
          );

          const swappedCardReduxActionObject = {
            id: formerCardOwner.id,
            strategyCard: swappedCard!,
          };
          dispatch(
            draggedCardIndex === 0
              ? addStrategyCardToPlayerDeckFront(swappedCardReduxActionObject)
              : addStrategyCardToPlayerDeck(swappedCardReduxActionObject)
          );

          const draggedCardReduxActionObject = {
            id: newCardOwner.id,
            strategyCard: draggedStrategyCard,
          };
          dispatch(
            swappedCardIndex === 0
              ? addStrategyCardToPlayerDeckFront(draggedCardReduxActionObject)
              : addStrategyCardToPlayerDeck(draggedCardReduxActionObject)
          );
        }
      } else {
        const swappedCard = newCardOwner.strategyCards[0];
        dispatch(
          removeStrategyCardFromPlayerDeck({
            id: formerCardOwner.id,
            strategyCard: draggedStrategyCard,
          })
        );
        dispatch(
          removeStrategyCardFromPlayerDeck({
            id: newCardOwner.id,
            strategyCard: swappedCard,
          })
        );
        dispatch(
          addStrategyCardToPlayerDeck({
            id: formerCardOwner.id,
            strategyCard: swappedCard,
          })
        );
        dispatch(
          addStrategyCardToPlayerDeck({
            id: newCardOwner.id,
            strategyCard: draggedStrategyCard,
          })
        );
      }
    }
  };

  // ======== BUTTONS ==========================================================

  const [hover, setHover] = useState<{
    no: boolean;
    yes: boolean;
  }>({
    no: false,
    yes: false,
  });

  const handleCancel = () => {
    dispatch(setSwapCardsBeingPlayed(false));
    dispatch(setSwapCardsPlayable(false));
    if (settings.races.naalu.inGame) {
      dispatch(setNaaluTokenBeingChanged(true));
      dispatch(
        setChoosePlayerAction({
          playable: true,
          isBeingPlayed: true,
          trigger: triggers.naaluTokenChange,
          chosenPlayer: null,
        })
      );
    } else {
      handle.endPhase();
    }
  };

  const handleAccept = () => {
    dispatch(switchSwapCardsStage());
    if (!beforeSwap) {
      dispatch(setSwapCardsBeingPlayed(false));
      dispatch(setSwapCardsPlayable(false));
      if (settings.races.naalu.inGame) {
        dispatch(setNaaluTokenBeingChanged(true));
        dispatch(
          setChoosePlayerAction({
            playable: true,
            isBeingPlayed: true,
            trigger: triggers.naaluTokenChange,
            chosenPlayer: null,
          })
        );
      } else {
        handle.endPhase();
      }
    }
  };

  // ======== CLASSES ==========================================================

  const swapCardsPanelClasses = cn({
    [styles.swapCardsPanel]: true,
    [styles.maxWidth]: beforeSwap,
  });

  const playersContainerClasses = cn({
    [styles.playersContainer]: true,
    [styles.threePlayers]: players.length === 3,
    [styles.fourPlayers]: players.length === 4,
    [styles.fivePlayers]: players.length === 5,
    [styles.sixPlayers]: players.length === 6,
    [styles.sevenPlayers]: players.length === 7,
    [styles.eightPlayers]: players.length === 8,
  });

  const buttonContainerClasses = cn({
    [styles.buttonContainer]: true,
    [styles.maxWidth]: !beforeSwap,
  });

  // ======== RENDER COMPONENT ==================================================

  return (
    <div className={swapCardsPanelClasses}>
      <h2>
        {beforeSwap
          ? "Do you want to swap strategy cards between players?"
          : "Drag strategy cards between players"}
      </h2>

      {!beforeSwap && (
        <div className={playersContainerClasses}>
          {players.map((player, index) => (
            <div
              key={player.id}
              className={styles.playerContainer}
              onDragEnter={updateSwappedCardID}
            >
              <div
                className={styles.playerName}
                style={{
                  color: player.theme.backgroundColor,
                  textShadow:
                    player.theme.backgroundColor === "#000000"
                      ? "1px 1px 1vh white"
                      : "",
                }}
              >
                {player.name}
              </div>
              <PlayerCardsPanel
                player={player}
                onDrop={(strategyCard) =>
                  moveBetweenPlayersDeck(strategyCard, index)
                }
              />
            </div>
          ))}
        </div>
      )}

      <div className={buttonContainerClasses}>
        {beforeSwap && (
          <button
            className={styles.button}
            onClick={handleCancel}
            onMouseEnter={() =>
              setHover((prevState) => ({ ...prevState, no: true }))
            }
            onMouseLeave={() =>
              setHover((prevState) => ({ ...prevState, no: false }))
            }
          >
            {hover.no ? "Next phase" : "No"}
          </button>
        )}

        <button
          className={styles.button}
          onClick={handleAccept}
          onMouseEnter={() =>
            setHover((prevState) => ({ ...prevState, yes: true }))
          }
          onMouseLeave={() =>
            setHover((prevState) => ({ ...prevState, yes: false }))
          }
        >
          {beforeSwap ? (hover.yes ? "Swap cards" : "Yes") : "Accept"}
        </button>
      </div>
    </div>
  );
};

export default SwapCardsPanel;
