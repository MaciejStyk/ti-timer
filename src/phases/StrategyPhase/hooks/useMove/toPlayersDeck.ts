import { useDispatch } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { addStrategyCardToPlayerDeck } from "../../../../redux/reducers/players";
import { removeStrategyCardFromAvailableDeck } from "../../../../redux/reducers/strategyPhase";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";

const useMoveToPlayersDeck = () => {
  const { currentPlayer, currentPlayerCanPick } = useCurrentPlayer();
  const dispatch = useDispatch();

  const moveToPlayersDeck = (strategyCard: IStrategyCard) => {
    if (
      !currentPlayer?.strategyCards.some(
        (card) => card.id === strategyCard.id
      ) &&
      currentPlayerCanPick
    ) {
      dispatch(
        addStrategyCardToPlayerDeck({
          id: currentPlayer!.id,
          strategyCard: strategyCard,
        })
      );
      dispatch(removeStrategyCardFromAvailableDeck(strategyCard));
    }
  };

  return moveToPlayersDeck;
};

export default useMoveToPlayersDeck;
