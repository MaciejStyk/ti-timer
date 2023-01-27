import { useDispatch } from "react-redux";
import views from "../../global/views";
import { setPlayerIndex } from "../../redux/playerIndex";
import { IPlayer } from "../../redux/players";
import { IRaces, setNaaluTokenBeingChanged } from "../../redux/races";
import {
  IStrategyPhase,
  setSwapCardsBeingPlayed,
} from "../../redux/strategyPhase";
import useNextPlayerIndex from "./nextPlayerIndex";

interface IProps {
  view: string;
  players: IPlayer[];
  races: IRaces;
  playerIndex: number;
  strategyPhase: IStrategyPhase;
}

const useNextPlayer = (props: IProps) => {
  const { view, players, races, playerIndex, strategyPhase } = props;
  const dispatch = useDispatch();

  const findNextPlayerIndex = useNextPlayerIndex();

  const switchToNextPlayer = () => {
    if (
      view === views.strategyPhase &&
      strategyPhase.swapCards.playable &&
      playerIndex === players.length - 1 &&
      strategyPhase.round === strategyPhase.numberOfRounds
    ) {
      dispatch(setSwapCardsBeingPlayed(true));
    } else if (
      view === views.strategyPhase &&
      races.naalu.inGame &&
      playerIndex === players.length - 1 &&
      strategyPhase.round === strategyPhase.numberOfRounds
    ) {
      dispatch(setNaaluTokenBeingChanged(true));
    } else {
      dispatch(setPlayerIndex(findNextPlayerIndex()));
    }
  };

  return switchToNextPlayer;
};

export default useNextPlayer;
