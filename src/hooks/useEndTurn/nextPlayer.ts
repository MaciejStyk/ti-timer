import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setChoosePlayerAction } from "../../redux/choosePlayerAction";
import { setPlayerIndex } from "../../redux/playerIndex";
import { setNaaluTokenBeingChanged } from "../../redux/races";
import { setSwapCardsBeingPlayed } from "../../redux/strategyPhase";
import useNextPlayerIndex from "./nextPlayerIndex";
import triggers from "../../global/triggers";
import views from "../../global/views";

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
      dispatch(
        setChoosePlayerAction({
          playable: true,
          isBeingPlayed: true,
          trigger: triggers.naaluTokenChange,
          chosenPlayer: null,
        })
      );
    } else {
      dispatch(setPlayerIndex(findNextPlayerIndex()));
    }
  };

  return switchToNextPlayer;
};

export default useNextPlayer;
