import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import store, { RootState } from "../../redux";
import { setPlayerIndex } from "../../redux/reducers/current/playerIndex";
import {
  sortPlayersByInitiative,
  sortPlayersStrategyCards,
} from "../../redux/reducers/players";
import { setRoundOrder } from "../../redux/reducers/current/roundOrder";
import { setStrategyPhaseRound } from "../../redux/reducers/strategyPhase";
import { changeView } from "../../redux/reducers/current/view";

const useEndStrategyPhase = () => {
  const { settings, current, players, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const endStrategyPhase = () => {
    if (current.playerIndex === players.length - 1) {
      if (strategyPhase.round < strategyPhase.numberOfRounds) {
        dispatch(setStrategyPhaseRound(2));
      } else if (
        !store.getState().settings.races.naalu.tokenChangeable &&
        !store.getState().strategyPhase.swapCards.playable
      ) {
        dispatch(setPlayerIndex(0));
        dispatch(setStrategyPhaseRound(1));
        dispatch(sortPlayersStrategyCards());
        dispatch(
          sortPlayersByInitiative({
            naaluInGame: settings.races.naalu.inGame,
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
