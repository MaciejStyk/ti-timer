import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IGameProps } from "../../types";
import BottomPanel from "../BottomPanel";
import LeftPanel from "../LeftPanel";
import PauseScreen from "../PauseScreen";
import PlayerPanel from "../PlayerPanel";
import ChoosePlayerPanel from "../ChoosePlayerPanel";
import StrategyCard from "../StrategyCard";
import TopPanel from "../TopPanel";
import triggers from "../../global/triggers";
import styles from "./index.module.css";

const StrategyAction: FunctionComponent<IGameProps> = (props) => {
  const {
    isRunning,
    timeDelayed,
    timeElapsed,
    timeBank,
    handlePause,
    handleEndTurn,
    nextTurnDisabled,
  } = props;
  const { players, playerIndex, strategyAction, choosePlayerAction } =
    useSelector((state: RootState) => state);
  const currentPlayer = players[playerIndex];

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.strategyActionContainer} style={currentPlayer.theme}>
      {!isRunning && <PauseScreen />}

      <TopPanel />

      <LeftPanel />

      <StrategyCard
        strategyCard={strategyAction.strategyCard!}
        draggable={false}
      />

      <PlayerPanel
        timeDelayed={timeDelayed}
        timeElapsed={timeElapsed}
        timeBank={timeBank}
      />

      {choosePlayerAction.isBeingPlayed && (
        <ChoosePlayerPanel trigger={triggers.politicsStrategyCard} />
      )}

      <BottomPanel
        handleEndTurn={handleEndTurn}
        nextTurnDisabled={nextTurnDisabled}
        handlePause={handlePause}
        isRunning={isRunning}
        passDisabled={true}
      />
    </div>
  );
};

export default StrategyAction;
