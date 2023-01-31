import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import BottomPanel from "../BottomPanel";
import LeftPanel from "../LeftPanel";
import PausePanel from "../PausePanel";
import PlayerPanel from "../PlayerPanel";
import ChoosePlayerPanel from "../ChoosePlayerPanel";
import StrategyCard from "../../components/StrategyCard";
import TopPanel from "../TopPanel";
import triggers from "../../global/triggers";
import styles from "./index.module.css";

const StrategyActionPanel: FunctionComponent<IPhaseProps> = (props) => {
  const { time } = props;
  const { players, playerIndex, strategyAction, choosePlayerAction } =
    useSelector((state: RootState) => state);
  const currentPlayer = players[playerIndex];

  return (
    <div className={styles.strategyActionContainer} style={currentPlayer.theme}>
      {!time.isRunning && <PausePanel />}

      <TopPanel />
      <LeftPanel />

      <StrategyCard
        strategyCard={strategyAction.strategyCard!}
        draggable={false}
      />

      <PlayerPanel {...props} />

      {choosePlayerAction.isBeingPlayed && (
        <ChoosePlayerPanel trigger={triggers.politicsStrategyCard} />
      )}

      <BottomPanel {...props} />
    </div>
  );
};

export default StrategyActionPanel;
