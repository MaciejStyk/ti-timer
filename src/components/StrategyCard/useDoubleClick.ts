import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IStrategyCard } from "../../global/strategyCards";
import useStrategyAction from "../../phases/ActionPhase/hooks/useStrategyAction";
import views from "../../global/views";

interface IProps {
  draggable: boolean;
  moveBetweenDecks?: (strategyCard: IStrategyCard) => void;
}

const useDoubleClick = (props: IProps) => {
  const { moveBetweenDecks, draggable } = props;
  const { current, strategyPhase } = useSelector((state: RootState) => state);
  const makeStrategyAction = useStrategyAction();

  const handleDoubleClick = (strategyCard: IStrategyCard) => {
    if (
      current.view === views.strategyPhase &&
      !strategyPhase.swapCards.isBeingPlayed
    ) {
      draggable && moveBetweenDecks!(strategyCard);
    }
    if (current.view === views.actionPhase) {
      makeStrategyAction(strategyCard);
    }
  };

  return handleDoubleClick;
};

export default useDoubleClick;
