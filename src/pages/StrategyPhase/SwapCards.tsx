import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import SwapCardsPanel from "./SwapCardsPanel";
import styles from "./index.module.css";

const SwapCards: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <div className={styles.panelContainer}>
        <SwapCardsPanel {...props} />
      </div>
    </div>
  );
};

export default SwapCards;
