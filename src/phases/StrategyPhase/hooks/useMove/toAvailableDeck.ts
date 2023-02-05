import { useDispatch, useSelector } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { RootState } from "../../../../redux";
import { removeStrategyCardFromPlayerDeck } from "../../../../redux/reducers/players";
import { addStrategyCardToAvailableDeck } from "../../../../redux/reducers/strategyPhase";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";

const useMoveToAvailableDeck = () => {
  const { strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayer } = useCurrentPlayer();
  const dispatch = useDispatch();

  const moveToAvailableDeck = (strategyCard: IStrategyCard) => {
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

  return moveToAvailableDeck;
};

export default useMoveToAvailableDeck;
