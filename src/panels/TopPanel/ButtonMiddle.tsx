import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import styles from "./index.module.css";

const ButtonMiddle = () => {
  const { current, strategyAction } = useSelector((state: RootState) => state);

  return (
    <button className={styles.disabledButton} disabled>
      {strategyAction.isBeingPlayed ? "strategy action" : current.view}
    </button>
  );
};

export default ButtonMiddle;
