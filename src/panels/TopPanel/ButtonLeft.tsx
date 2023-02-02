import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import styles from "./index.module.css";

const ButtonLeft = () => {
  const { current } = useSelector((state: RootState) => state);

  return (
    <button className={styles.disabledButton} disabled>
      Round {current.gameRound}
    </button>
  );
};

export default ButtonLeft;
