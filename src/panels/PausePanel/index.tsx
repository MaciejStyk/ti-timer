import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import styles from "./index.module.css";

const PausePanel = () => {
  const { current, players } = useSelector((state: RootState) => state);
  const currentPlayer = players[current.playerIndex];

  return (
    <div className={styles.pausePanel} style={currentPlayer.theme}>
      Paused
    </div>
  );
};

export default PausePanel;
