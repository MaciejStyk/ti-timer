import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux";
import { setPlayerIndex } from "../../redux/playerIndex";
import { reorderPlayers } from "../../redux/players";
import { resetStrategyAction } from "../../redux/strategyAction";

const useFinishStrategyAction = () => {
  const { players, roundOrder, playerIndex, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const finishStrategyAction = () => {
    if (strategyAction.isBeingPlayed && playerIndex === players.length - 1) {
      dispatch(
        reorderPlayers({
          startingPlayer: roundOrder[0],
          order: roundOrder,
        })
      );
      dispatch(
        setPlayerIndex(
          store
            .getState()
            .players.findIndex(
              (player) => player.id === strategyAction.playedBy!.id
            )
        )
      );
      dispatch(resetStrategyAction());
    }
  };

  return finishStrategyAction;
};

export default useFinishStrategyAction;
