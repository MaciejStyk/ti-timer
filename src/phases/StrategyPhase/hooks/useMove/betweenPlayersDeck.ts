import { useDispatch, useSelector } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { RootState } from "../../../../redux";
import {
  addStrategyCardToPlayerDeck,
  addStrategyCardToPlayerDeckFront,
  removeStrategyCardFromPlayerDeck,
} from "../../../../redux/reducers/players";

const useMoveBetweenPlayersDeck = (swappedCardID: number | undefined) => {
  const { players } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

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

  return moveBetweenPlayersDeck;
};

export default useMoveBetweenPlayersDeck;
