import { useDispatch, useSelector } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { RootState } from "../../../../redux";
import {
  addStrategyCardToPlayerDeck,
  removeStrategyCardFromPlayerDeck,
} from "../../../../redux/reducers/players";
import {
  addStrategyCardToAvailableDeck,
  removeStrategyCardFromAvailableDeck,
} from "../../../../redux/reducers/strategyPhase";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";

const useMove = () => {
  const { strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayer, currentPlayerCanPick } = useCurrentPlayer();
  const dispatch = useDispatch();

  const toPlayersDeck = (strategyCard: IStrategyCard) => {
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

  const toAvailableDeck = (strategyCard: IStrategyCard) => {
    if (
      !strategyPhase.availableStrategyCards.some(
        (card) => card.id === strategyCard.id
      )
    ) {
      dispatch(addStrategyCardToAvailableDeck(strategyCard));
      dispatch(
        removeStrategyCardFromPlayerDeck({
          id: currentPlayer!.id,
          strategyCard: strategyCard,
        })
      );
    }
  };

  return { toPlayersDeck, toAvailableDeck };
};

export default useMove;
