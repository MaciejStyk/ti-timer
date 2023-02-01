import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import StrategyAction from "./StrategyAction";
import NormalAction from "./NormalAction";

const ActionPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { strategyAction } = useSelector((state: RootState) => state);

  if (strategyAction.isBeingPlayed) {
    return <StrategyAction {...props} />;
  } else {
    return <NormalAction {...props} />;
  }
};

export default ActionPhase;
