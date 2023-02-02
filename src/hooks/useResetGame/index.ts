import { useDispatch } from "react-redux";
import { resetAgendaPhase } from "../../redux/reducers/agendaPhase";
import { resetChoosePlayerAction } from "../../redux/reducers/choosePlayerAction";
import { resetColors } from "../../redux/reducers/colors";
import { resetGameRound } from "../../redux/reducers/current/gameRound";
import { setPlayerIndex } from "../../redux/reducers/current/playerIndex";
import { setPlayers } from "../../redux/reducers/players";
import { resetRaces } from "../../redux/reducers/races";
import { setRoundOrder } from "../../redux/reducers/roundOrder";
import { resetStrategyAction } from "../../redux/reducers/strategyAction";
import { resetStrategyPhase } from "../../redux/reducers/strategyPhase";
import { setTableOrder } from "../../redux/reducers/tableOrder";
import { resetTimer } from "../../redux/reducers/timer";
import { changeView } from "../../redux/reducers/current/view";
import views from "../../global/views";

const useResetGame = () => {
  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(setPlayers([]));
    dispatch(resetColors());
    dispatch(resetStrategyPhase());
    dispatch(resetTimer());
    dispatch(setTableOrder([]));
    dispatch(setRoundOrder([]));
    dispatch(setPlayerIndex(0));
    dispatch(resetGameRound());
    dispatch(resetStrategyAction());
    dispatch(resetRaces());
    dispatch(resetAgendaPhase());
    dispatch(resetChoosePlayerAction());
    dispatch(changeView(views.setupPhase));
  };

  return resetGame;
};

export default useResetGame;
