import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { IStrategyCard } from "../../global/strategyCards";
import { RootState } from "../../redux";
import views from "../../global/views";

const useDnD = (onDrop: (strategyCard: IStrategyCard) => void) => {
  const { current, strategyPhase } = useSelector((state: RootState) => state);

  const [{ isOver, canDrop, draggedCard }, dropRef] = useDrop({
    accept: "strategyCard",
    drop: onDrop!,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedCard: monitor.getItem(),
    }),
  });

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

  return { dropRef, isOver, canDrop, draggedCard, draggable };
};

export default useDnD;
