import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import LeftPanel from "../../panels/LeftPanel";
import PlayerPanel from "../../panels/PlayerPanel";
import BottomPanel from "../../panels/BottomPanel";
import PausePanel from "../../panels/PausePanel";
import styles from "./index.module.css";

const AgendaVoted: FunctionComponent<IPhaseProps> = (props) => {
  const { time } = props;
  const { current, players } = useSelector((state: RootState) => state);
  const currentPlayer = players[current.playerIndex];

  return (
    <div className={styles.fullScreenContainer} style={currentPlayer.theme}>
      {!time.isRunning && <PausePanel />}
      <TopPanel />
      <LeftPanel />
      <PlayerPanel {...props} />
      <BottomPanel {...props} />
    </div>
  );
};

export default AgendaVoted;
