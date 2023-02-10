import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useDrag } from "react-dnd";
import { IStrategyCard } from "../../global/strategyCards";
import views from "../../global/views";
import CardPlaceholder from "../CardPlaceholder";
import SpeakerButton from "../SpeakerButton";
import Tooltip from "./Tooltip";
import cn from "classnames";
import styles from "./index.module.css";

interface Props {
  strategyCard: IStrategyCard;
  moveBetweenDecks?: (strategyCard: IStrategyCard) => void;
  draggable: boolean;
  makeStrategyAction?: (strategyCard: IStrategyCard) => void;
}

const StrategyCard: FunctionComponent<Props> = (props) => {
  const { strategyCard, moveBetweenDecks, draggable, makeStrategyAction } =
    props;
  const { current, strategyPhase, strategyAction } = useSelector(
    (state: RootState) => state
  );

  const [hover, setHover] = useState(false);

  // ======== DRAG N DROP  =====================================================

  const [draggedOver, setDraggedOver] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: "strategyCard",
    item: strategyCard,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: draggable,
  });

  // ======== DOUBLE CLICK  ====================================================

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

  // ======== CLASSES ==========================================================

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

  // ======== RENDER COMPONENT =================================================

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
        ref={views.strategyPhase && dragRef}
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
