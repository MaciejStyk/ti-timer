import { useDispatch } from "react-redux";
import views from "../../global/views";
import { IPlayer, setPlayersTimeBank } from "../../redux/players";
import { IRaces } from "../../redux/races";
import {
  setStrategyPhaseNumberOfRounds,
  setSwapCardsPlayable,
} from "../../redux/strategyPhase";
import { setTableOrder } from "../../redux/tableOrder";
import { ITimer } from "../../redux/timer";
import { changeView } from "../../redux/view";

interface IProps {
  players: IPlayer[];
  timer: ITimer;
  races: IRaces;
}

const useEndSetupPhase = (props: IProps) => {
  const { players, timer, races } = props;
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
