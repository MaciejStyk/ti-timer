import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import views from "../../global/views";
import { changeView } from "../../redux/view";
import { setPlayers } from "../../redux/players";
import { resetColors } from "../../redux/colors";
import { resetStrategyPhase } from "../../redux/strategyPhase";
import { setTableOrder } from "../../redux/tableOrder";
import { resetGameRound } from "../../redux/gameRound";
import styles from "./index.module.css";
import { setRoundOrder } from "../../redux/roundOrder";
import { resetStrategyAction } from "../../redux/strategyAction";
import { setPlayerIndex } from "../../redux/playerIndex";
import { resetRaces } from "../../redux/races";
import { resetAgendaPhase } from "../../redux/agendaPhase";
import { resetTimer } from "../../redux/timer";
import { resetChoosePlayerAction } from "../../redux/choosePlayerAction";

const TopPanel = () => {
  const { view, gameRound, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const [hover, setHover] = useState<boolean>(false);

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

  return (
    <div className={styles.topPanel}>
      <button className={styles.disabledButton} disabled>
        Round {gameRound}
      </button>

      <button className={styles.disabledButton} disabled>
        {strategyAction.isBeingPlayed ? "strategy action" : view}
      </button>

      <button
        className={styles.actionButton}
        onDoubleClick={resetGame}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <span className={styles.smallerFont}>Double click to proceed</span>
        ) : (
          "Back to setup"
        )}
      </button>
    </div>
  );
};

export default TopPanel;
