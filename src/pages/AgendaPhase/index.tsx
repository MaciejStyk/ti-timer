import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import TopPanel from "../../components/TopPanel";
import CustodianPanel from "../../components/CustodianPanel";
import AgendaPanel from "../../components/AgendaPanel";
import LeftPanel from "../../components/LeftPanel";
import PlayerPanel from "../../components/PlayerPanel";
import BottomPanel from "../../components/BottomPanel";
import PauseScreen from "../../components/PauseScreen";
import styles from "./index.module.css";

const AgendaPhase: FunctionComponent<IPhaseProps> = (props) => {
  const {
    time,
    handlePause,
    handleEndTurn,
    endTurnDisabled,
    handlePass,
    passDisabled,
    endPhase,
  } = props;
  const { players, playerIndex, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];

  // ======== RENDER PAGE ======================================================

  if (!agendaPhase.unlocked) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <CustodianPanel endPhase={endPhase} />
      </div>
    );
  } else if (!agendaPhase.isBeingVoted) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <AgendaPanel endPhase={endPhase} />
      </div>
    );
  } else {
    return (
      <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
        {!time.isRunning && <PauseScreen />}

        <TopPanel />

        <LeftPanel />

        <PlayerPanel time={time} />

        <BottomPanel
          time={time}
          handlePause={handlePause}
          handleEndTurn={handleEndTurn}
          endTurnDisabled={endTurnDisabled}
          handlePass={handlePass}
          passDisabled={passDisabled}
        />
      </div>
    );
  }
};

export default AgendaPhase;
