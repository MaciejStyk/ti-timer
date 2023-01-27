import { useDispatch } from "react-redux";
import views from "../../global/views";
import store from "../../redux";
import { setPlayerIndex } from "../../redux/playerIndex";
import {
  IPlayer,
  sortPlayersByInitiative,
  sortPlayersStrategyCards,
} from "../../redux/players";
import { IRaces } from "../../redux/races";
import { setRoundOrder } from "../../redux/roundOrder";
import {
  IStrategyPhase,
  setStrategyPhaseRound,
} from "../../redux/strategyPhase";
import { changeView } from "../../redux/view";

interface IProps {
  players: IPlayer[];
  races: IRaces;
  playerIndex: number;
  strategyPhase: IStrategyPhase;
}

const useEndStrategyPhase = (props: IProps) => {
  const { players, races, playerIndex, strategyPhase } = props;
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
