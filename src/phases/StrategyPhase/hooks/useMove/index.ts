import { useDispatch, useSelector } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { RootState } from "../../../../redux";
import {
  addStrategyCardToPlayerDeck,
  IPlayer,
  removeStrategyCardFromPlayerDeck,
} from "../../../../redux/players";
import {
  addStrategyCardToAvailableDeck,
  removeStrategyCardFromAvailableDeck,
} from "../../../../redux/strategyPhase";

interface IProps {
  currentPlayer: IPlayer;
  currentPlayerCanPick: boolean;
}

const useMove = (props: IProps) => {
  const { currentPlayer, currentPlayerCanPick } = props;
  const { strategyPhase } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const toPlayersDeck = (strategyCard: IStrategyCard) => {
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
          id: currentPlayer.id,
          strategyCard: strategyCard,
        })
      );
    }
  };

  return { toPlayersDeck, toAvailableDeck };
};

export default useMove;
