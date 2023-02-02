import ButtonLeft from "./ButtonLeft";
import ButtonMiddle from "./ButtonMiddle";
import ButtonRight from "./ButtonRight";
import styles from "./index.module.css";

const TopPanel = () => {
  return (
    <div className={styles.topPanel}>
      <ButtonLeft />
      <ButtonMiddle />
      <ButtonRight />
    </div>
  );
};

export default TopPanel;
