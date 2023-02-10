import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { IStrategyCard } from "../../global/strategyCards";
import { RootState } from "../../redux";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import views from "../../global/views";

const usePlayerDnD = (onDrop: (strategyCard: IStrategyCard) => void) => {
  const { current, strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayerCanPick } = useCurrentPlayer();

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "strategyCard",
    drop: onDrop!,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const showPlaceholder = isOver && currentPlayerCanPick;

  const draggable: (index: number) => boolean = (index) => {
    if (current.view === views.strategyPhase) {
      return (
        strategyPhase.swapCards.isBeingPlayed ||
        index === strategyPhase.round - 1
      );
    } else {
      return false;
    }
  };

  return { dropRef, isOver, canDrop, showPlaceholder, draggable };
};

export default usePlayerDnD;
