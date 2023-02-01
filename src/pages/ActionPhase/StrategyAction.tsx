import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import StrategyActionPanel from "./StrategyActionPanel";
import styles from "./index.module.css";

const StrategyAction: FunctionComponent<IPhaseProps> = (props) => {
  const { strategyAction } = useSelector((state: RootState) => state);

  return (
    <div
      className={styles.fullScreenContainer}
      style={strategyAction.playedBy?.theme}
    >
      <StrategyActionPanel {...props} />
    </div>
  );
};

export default StrategyAction;
