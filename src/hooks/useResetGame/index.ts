import { useDispatch } from "react-redux";
import { resetAgendaPhase } from "../../redux/agendaPhase";
import { resetChoosePlayerAction } from "../../redux/choosePlayerAction";
import { resetColors } from "../../redux/colors";
import { resetGameRound } from "../../redux/gameRound";
import { setPlayerIndex } from "../../redux/playerIndex";
import { setPlayers } from "../../redux/players";
import { resetRaces } from "../../redux/races";
import { setRoundOrder } from "../../redux/roundOrder";
import { resetStrategyAction } from "../../redux/strategyAction";
import { resetStrategyPhase } from "../../redux/strategyPhase";
import { setTableOrder } from "../../redux/tableOrder";
import { resetTimer } from "../../redux/timer";
import { changeView } from "../../redux/view";
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
