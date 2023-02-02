import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setChoosePlayerAction } from "../../redux/reducers/choosePlayerAction";
import { setPlayerIndex } from "../../redux/reducers/current/playerIndex";
import { setNaaluTokenBeingChanged } from "../../redux/reducers/races";
import { setSwapCardsBeingPlayed } from "../../redux/reducers/strategyPhase";
import useNextPlayerIndex from "./nextPlayerIndex";
import triggers from "../../global/triggers";
import views from "../../global/views";

const useNextPlayer = () => {
  const { current, players, races, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const findNextPlayerIndex = useNextPlayerIndex();

  const switchToNextPlayer = () => {
    if (
      current.view === views.strategyPhase &&
      strategyPhase.swapCards.playable &&
      current.playerIndex === players.length - 1 &&
      strategyPhase.round === strategyPhase.numberOfRounds
    ) {
      dispatch(setSwapCardsBeingPlayed(true));
    } else if (
      current.view === views.strategyPhase &&
      races.naalu.inGame &&
      current.playerIndex === players.length - 1 &&
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
