import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import useKeyBindings from "./hooks/useKeyBindings";
import PausePanel from "../../panels/PausePanel";
import TopPanel from "../../panels/TopPanel";
import LeftPanel from "../../panels/LeftPanel";
import PlayerPanel from "../../panels/PlayerPanel";
import BottomPanel from "../../panels/BottomPanel";
import PlayerCardsPanel from "../../panels/PlayerCardsPanel";
import styles from "./index.module.css";

const NormalAction: FunctionComponent<IPhaseProps> = (props) => {
  const { time } = props;
  const { currentPlayer } = useCurrentPlayer();

  useKeyBindings(props);

  return (
    <div className={styles.fullScreenContainer} style={currentPlayer?.theme}>
      {!time.isRunning && <PausePanel />}
      <TopPanel />
      <LeftPanel />
      <PlayerPanel {...props} />
      <PlayerCardsPanel player={currentPlayer!} />
      <BottomPanel {...props} />
    </div>
  );
};

export default NormalAction;
