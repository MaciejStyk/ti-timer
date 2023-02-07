import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setPlayerIndex } from "../../redux/reducers/current/playerIndex";
import { setSwapCardsBeingPlayed } from "../../redux/reducers/strategyPhase";
import useNextPlayerIndex from "./nextPlayerIndex";
import views from "../../global/views";

const useNextPlayer = () => {
  const { current, players, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const findNextPlayerIndex = useNextPlayerIndex();

  const switchToNextPlayer = () => {
    if (
      current.view === views.strategyPhase &&
      current.playerIndex === players.length - 1 &&
      strategyPhase.round === strategyPhase.numberOfRounds
    ) {
      dispatch(setSwapCardsBeingPlayed(true));
    } else {
      dispatch(setPlayerIndex(findNextPlayerIndex()));
    }
  };

  return switchToNextPlayer;
};

export default useNextPlayer;
