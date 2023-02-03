import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import styles from "./index.module.css";

const PausePanel = () => {
  const { currentPlayer } = useCurrentPlayer();

  return (
    <div className={styles.pausePanel} style={currentPlayer?.theme}>
      Paused
    </div>
  );
};

export default PausePanel;
