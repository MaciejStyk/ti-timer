import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useDrag } from "react-dnd";
import { IStrategyCard } from "../../global/strategyCards";
import useStrategyAction from "../../phases/ActionPhase/hooks/useStrategyAction";
import CardPlaceholder from "../CardPlaceholder";
import SpeakerButton from "./SpeakerButton";
import Tooltip from "./Tooltip";
import views from "../../global/views";
import cn from "classnames";
import styles from "./index.module.css";

interface Props {
  strategyCard: IStrategyCard;
  draggable: boolean;
  moveBetweenDecks?: (strategyCard: IStrategyCard) => void;
}

const StrategyCard: FunctionComponent<Props> = (props) => {
  const { strategyCard, moveBetweenDecks, draggable } = props;
  const { current, strategyPhase, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const makeStrategyAction = useStrategyAction();

  const [hover, setHover] = useState(false);
  const [draggedOver, setDraggedOver] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: "strategyCard",
    item: strategyCard,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: draggable,
  });

  const handleDoubleClick = (strategyCard: IStrategyCard) => {
    if (
      current.view === views.strategyPhase &&
      !strategyPhase.swapCards.isBeingPlayed
    ) {
      draggable && moveBetweenDecks!(strategyCard);
    }
    if (current.view === views.actionPhase) {
      makeStrategyAction!(strategyCard);
    }
  };

  const cardContainerClasses = cn({
    [styles.cardContainer]: !strategyAction.isBeingPlayed,
    [styles.cardContainerStrategyAction]: strategyAction.isBeingPlayed,
  });

  const strategyCardClasses = cn({
    [styles.strategyCardImg]: true,
    [styles.grab]: draggable,
    [styles.clickable]:
      current.view === views.actionPhase &&
      !strategyCard.exhausted &&
      !strategyAction.isBeingPlayed,
    [styles.scaledBigger]:
      current.view === views.strategyPhase
        ? draggable && !isDragging
        : !strategyCard.exhausted && !strategyAction.isBeingPlayed,
    [styles.draggedOver]: strategyPhase.swapCards.isBeingPlayed && draggedOver,
  });

  if (isDragging) return <CardPlaceholder />;

  return (
    <div className={cardContainerClasses}>
      <SpeakerButton />
      <Tooltip hover={hover} strategyCard={strategyCard} />

      <img
        src={strategyCard.exhausted ? strategyCard.urlBack : strategyCard.url}
        id={String(strategyCard.id)}
        alt={`${strategyCard.name} card`}
        className={strategyCardClasses}
        ref={dragRef}
        onDoubleClick={() => handleDoubleClick(strategyCard)}
        draggable={draggable}
        onDragEnter={() => setDraggedOver(true)}
        onDragLeave={() => setDraggedOver(false)}
        onDrop={() => setDraggedOver(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </div>
  );
};

export default StrategyCard;
