import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import { RootState } from "../../redux";
import { setPlayersTimeBank } from "../../redux/reducers/players";
import {
  setStrategyPhaseNumberOfRounds,
} from "../../redux/reducers/strategyPhase";
import { changeView } from "../../redux/reducers/current/view";
import { setTableOrder } from "../../redux/reducers/settings/tableOrder";

const useEndSetupPhase = () => {
  const { settings, players } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const endSetupPhase = () => {
    dispatch(setTableOrder(players));
    dispatch(setPlayersTimeBank(settings.timer.timeBank));
    dispatch(setStrategyPhaseNumberOfRounds(players.length <= 4 ? 2 : 1));
    dispatch(changeView(views.strategyPhase));
  };

  return endSetupPhase;
};

export default useEndSetupPhase;
