import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { IStrategyCard } from "../../global/strategyCards";
import { RootState } from "../../redux";
import views from "../../global/views";

interface IProps {
  onDrop?: (strategyCard: IStrategyCard) => void
  strategyCard?: IStrategyCard;
  draggable?: boolean;
}

const useDnD = (props: IProps) => {
  const { onDrop, strategyCard, draggable } = props;
  const { current, strategyPhase } = useSelector((state: RootState) => state);
  const draggedItemType = "strategyCard"

  const [{ isOver, canDrop, draggedCard }, dropRef] = useDrop({
    accept: draggedItemType,
    drop: onDrop!,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedCard: monitor.getItem(),
    }),
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: draggedItemType,
    item: strategyCard,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: draggable,
  });

  const isDraggable: (index: number) => boolean = (index) => {
    if (current.view === views.strategyPhase) {
      return (
        strategyPhase.swapCards.isBeingPlayed ||
        index === strategyPhase.round - 1
      );
    } else {
      return false;
    }
  };

  return { dropRef, isOver, canDrop, draggedCard, dragRef, isDragging, isDraggable };
};

export default useDnD;
