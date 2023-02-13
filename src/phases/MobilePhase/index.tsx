import { FunctionComponent } from "react";
import styles from "./index.module.css";

const MobilePhase: FunctionComponent = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>This app works only on bigger screens</h1>
      </div>
    </div>
  );
};

export default MobilePhase;
