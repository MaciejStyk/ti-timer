import { useState } from "react";
import useResetGame from "../../hooks/useResetGame";
import styles from "./index.module.css";

const ButtonRight = () => {
  const [hover, setHover] = useState<boolean>(false);
  const resetGame = useResetGame();

  return (
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
  );
};

export default ButtonRight;
