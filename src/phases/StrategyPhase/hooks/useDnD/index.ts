import { IMove } from "../../../../types";
import { useDrop } from "react-dnd";
import { IStrategyCard } from "../../../../global/strategyCards";
import useCurrentPlayer from "../../../../hooks/useCurrentPlayer";

const useDnD = (move: IMove) => {
  const { currentPlayerCanPick } = useCurrentPlayer();

  const [{ isOver, draggedCard, canDrop }, dropRef] = useDrop({
    accept: "strategyCard",
    drop: (strategyCard: IStrategyCard) => move.toAvailableDeck(strategyCard),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggedCard: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
  });

  const showPlaceholder = isOver && !currentPlayerCanPick;

  return { dropRef, canDrop, draggedCard, showPlaceholder };
};

export default useDnD;
