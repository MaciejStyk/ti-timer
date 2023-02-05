import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const Title: FunctionComponent = () => {
  const { strategyPhase } = useSelector((state: RootState) => state);

  return (
    <h2>
      {strategyPhase.swapCards.beforeSwap
        ? "Do you want to swap strategy cards between players?"
        : "Drag strategy cards between players"}
    </h2>
  );
};

export default Title;
