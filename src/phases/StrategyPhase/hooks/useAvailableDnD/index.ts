import { useDrop } from "react-dnd";
import { IStrategyCard } from "../../../../global/strategyCards";

const useAvailableDnD = (onDrop: (strategyCard: IStrategyCard) => void) => {
  const [{ isOver, draggedCard, canDrop }, dropRef] = useDrop({
    accept: "strategyCard",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggedCard: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
  });

  return { dropRef, isOver, canDrop, draggedCard };
};

export default useAvailableDnD;
