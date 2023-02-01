import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import ChooseNaalu from "./ChooseNaalu";
import SwapCards from "./SwapCards";
import DealCards from "./DealCards";

const StrategyPhase: FunctionComponent<IPhaseProps> = (props) => {
  const { races, strategyPhase } = useSelector((state: RootState) => state);

  if (races.naalu.tokenBeingChanged) {
    return <ChooseNaalu {...props} />;
  } else if (strategyPhase.swapCards.isBeingPlayed) {
    return <SwapCards {...props} />;
  } else return <DealCards {...props} />;
};

export default StrategyPhase;
