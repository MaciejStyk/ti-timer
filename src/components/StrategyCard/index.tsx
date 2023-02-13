import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IStrategyCard } from "../../global/strategyCards";
import useDnD from "../../hooks/useDnD";
import useDoubleClick from "./useDoubleClick";
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
  const { dragRef, isDragging } = useDnD({ strategyCard, draggable });
  const handleDoubleClick = useDoubleClick({ draggable, moveBetweenDecks });

  const [hover, setHover] = useState(false);
  const [draggedOver, setDraggedOver] = useState(false);

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
