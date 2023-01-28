import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import store, { RootState } from "../../redux";
import { setPlayerIndex } from "../../redux/playerIndex";
import {
  sortPlayersByInitiative,
  sortPlayersStrategyCards,
} from "../../redux/players";
import { setRoundOrder } from "../../redux/roundOrder";
import { setStrategyPhaseRound } from "../../redux/strategyPhase";
import { changeView } from "../../redux/view";

const useEndStrategyPhase = () => {
  const { players, races, playerIndex, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const endStrategyPhase = () => {
    if (playerIndex === players.length - 1) {
      if (strategyPhase.round < strategyPhase.numberOfRounds) {
        dispatch(setStrategyPhaseRound(2));
      } else if (
        !store.getState().races.naalu.tokenChangeable &&
        !store.getState().strategyPhase.swapCards.playable
      ) {
        dispatch(setPlayerIndex(0));
        dispatch(setStrategyPhaseRound(1));
        dispatch(sortPlayersStrategyCards());
        dispatch(
          sortPlayersByInitiative({
            naaluInGame: races.naalu.inGame,
          })
        );
        dispatch(setRoundOrder(store.getState().players));
        dispatch(changeView(views.actionPhase));
      }
    }
  };

  return endStrategyPhase;
};

export default useEndStrategyPhase;
