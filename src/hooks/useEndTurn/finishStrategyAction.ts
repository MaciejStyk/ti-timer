import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux";
import { setPlayerIndex } from "../../redux/reducers/current/playerIndex";
import { reorderPlayers } from "../../redux/reducers/players";
import { resetStrategyAction } from "../../redux/reducers/strategyAction";

const useFinishStrategyAction = () => {
  const { current, players, roundOrder, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const finishStrategyAction = () => {
    if (
      strategyAction.isBeingPlayed &&
      current.playerIndex === players.length - 1
    ) {
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
