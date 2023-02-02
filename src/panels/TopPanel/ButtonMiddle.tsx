import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import styles from "./index.module.css";

const ButtonMiddle = () => {
  const { view, strategyAction } = useSelector((state: RootState) => state);

  return (
    <button className={styles.disabledButton} disabled>
      {strategyAction.isBeingPlayed ? "strategy action" : view}
    </button>
  );
};

export default ButtonMiddle;
