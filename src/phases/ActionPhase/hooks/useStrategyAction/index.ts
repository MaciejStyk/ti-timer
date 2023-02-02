import { useDispatch, useSelector } from "react-redux";
import { IStrategyCard } from "../../../../global/strategyCards";
import { RootState } from "../../../../redux";
import { setChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";
import { setPlayerIndex } from "../../../../redux/reducers/current/playerIndex";
import {
  exhaustStrategyCardAtPlayerDeck,
  IPlayer,
  reorderPlayers,
} from "../../../../redux/reducers/players";
import { playStrategyAction } from "../../../../redux/reducers/strategyAction";

const useStrategyAction = (currentPlayer: IPlayer) => {
  const { tableOrder } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const makeStrategyAction = (strategyCard: IStrategyCard) => {
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
            trigger: "",
            chosenPlayer: null,
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
  };

  return makeStrategyAction;
};

export default useStrategyAction;
