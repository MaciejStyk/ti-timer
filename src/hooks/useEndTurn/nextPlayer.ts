import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import { RootState } from "../../redux";
import { setPlayerIndex } from "../../redux/playerIndex";
import { setNaaluTokenBeingChanged } from "../../redux/races";
import { setSwapCardsBeingPlayed } from "../../redux/strategyPhase";
import useNextPlayerIndex from "./nextPlayerIndex";

const useNextPlayer = () => {
  const { view, players, races, playerIndex, strategyPhase } = useSelector(
    (state: RootState) => state
  );
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
