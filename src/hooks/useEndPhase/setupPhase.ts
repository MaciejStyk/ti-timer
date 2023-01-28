import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import { RootState } from "../../redux";
import { setPlayersTimeBank } from "../../redux/players";
import {
  setStrategyPhaseNumberOfRounds,
  setSwapCardsPlayable,
} from "../../redux/strategyPhase";
import { setTableOrder } from "../../redux/tableOrder";
import { changeView } from "../../redux/view";

const useEndSetupPhase = () => {
  const { players, races, timer } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const endSetupPhase = () => {
    dispatch(setTableOrder(players));
    dispatch(setPlayersTimeBank(timer.timeBank));
    dispatch(setStrategyPhaseNumberOfRounds(players.length <= 4 ? 2 : 1));
    dispatch(setSwapCardsPlayable(races.winnuOrHacan.inGame));
    dispatch(changeView(views.strategyPhase));
  };

  return endSetupPhase;
};

export default useEndSetupPhase;
