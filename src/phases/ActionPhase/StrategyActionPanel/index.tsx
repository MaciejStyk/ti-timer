import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import BottomPanel from "../../../panels/BottomPanel";
import LeftPanel from "../../../panels/LeftPanel";
import PausePanel from "../../../panels/PausePanel";
import PlayerPanel from "../../../panels/PlayerPanel";
import ChoosePlayerPanel from "../../../panels/ChoosePlayerPanel";
import StrategyCard from "../../../components/StrategyCard";
import TopPanel from "../../../panels/TopPanel";
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

      {choosePlayerAction.isBeingPlayed ? (
        <ChoosePlayerPanel />
      ) : (
        <PlayerPanel {...props} />
      )}

      <BottomPanel {...props} />
    </div>
  );
};

export default StrategyActionPanel;
