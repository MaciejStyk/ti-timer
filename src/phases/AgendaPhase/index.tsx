import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import CustodianPanel from "./CustodianPanel";
import AgendaPanel from "./AgendaPanel";
import LeftPanel from "../../panels/LeftPanel";
import PlayerPanel from "../../panels/PlayerPanel";
import BottomPanel from "../../panels/BottomPanel";
import PausePanel from "../../panels/PausePanel";
import styles from "./index.module.css";

const AgendaPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { time } = props;
  const { players, playerIndex, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];

  if (!agendaPhase.unlocked) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <CustodianPanel {...props} />
      </div>
    );
  } else if (!agendaPhase.isBeingVoted) {
    return (
      <div className={styles.background}>
        <TopPanel />
        <AgendaPanel {...props} />
      </div>
    );
  } else {
    return (
      <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
        {!time.isRunning && <PausePanel />}
        <TopPanel />
        <LeftPanel />
        <PlayerPanel {...props} />
        <BottomPanel {...props} />
      </div>
    );
  }
};

export default AgendaPhase;
