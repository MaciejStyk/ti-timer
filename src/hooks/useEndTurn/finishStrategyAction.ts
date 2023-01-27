import { useDispatch } from "react-redux";
import store from "../../redux";
import { setPlayerIndex } from "../../redux/playerIndex";
import { IPlayer, reorderPlayers } from "../../redux/players";
import {
  IStrategyAction,
  resetStrategyAction,
} from "../../redux/strategyAction";

interface IProps {
  players: IPlayer[];
  playerIndex: number;
  roundOrder: IPlayer[];
  strategyAction: IStrategyAction;
}

const useFinishStrategyAction = (props: IProps) => {
  const { players, playerIndex, roundOrder, strategyAction } = props;
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
