import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import Title from "./Title";
import Buttons from "./Buttons";
import cn from "classnames";
import styles from "./index.module.css";
import PlayerDecks from "./PlayerDecks";

const SwapCardsPanel: FunctionComponent<IPhaseProps> = (props) => {
  const { strategyPhase } = useSelector((state: RootState) => state);
  const beforeSwap = strategyPhase.swapCards.beforeSwap;

  const swapCardsPanelClasses = cn({
    [styles.swapCardsPanel]: true,
    [styles.maxWidth]: beforeSwap,
  });

  return (
    <div className={swapCardsPanelClasses}>
      <Title />
      {!beforeSwap && <PlayerDecks />}
      <Buttons {...props} />
    </div>
  );
};

export default SwapCardsPanel;
