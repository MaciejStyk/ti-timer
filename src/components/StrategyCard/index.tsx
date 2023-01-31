import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setChoosePlayerAction } from "../../redux/choosePlayerAction";
import { useDrag } from "react-dnd";
import { IStrategyCard } from "../../global/strategyCards";
import views from "../../global/views";
import CardPlaceholder from "../CardPlaceholder";
import SpeakerButton from "../SpeakerButton";
import Tooltip from "../Tooltip";
import styles from "./index.module.css";
import cn from "classnames";

interface Props {
  strategyCard: IStrategyCard;
  moveBetweenDecks?: (strategyCard: IStrategyCard) => void;
  draggable: boolean;
  makeStrategyAction?: (strategyCard: IStrategyCard) => void;
}

const StrategyCard: FunctionComponent<Props> = (props) => {
  const { strategyCard, moveBetweenDecks, draggable, makeStrategyAction } =
    props;
  const { view, strategyPhase, strategyAction, choosePlayerAction } =
    useSelector((state: RootState) => state);
  const dispatch = useDispatch();

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
      view === views.strategyPhase &&
      !strategyPhase.swapCards.isBeingPlayed
    ) {
      draggable && moveBetweenDecks!(strategyCard);
    }
    if (view === views.actionPhase) {
      makeStrategyAction!(strategyCard);
    }
  };

  // ======== CLICK  ===========================================================

  const handleClick = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
      })
    );
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
      view === views.actionPhase &&
      !strategyCard.exhausted &&
      !strategyAction.isBeingPlayed,
    [styles.scaledBigger]:
      view === views.strategyPhase
        ? draggable && !isDragging
        : !strategyCard.exhausted && !strategyAction.isBeingPlayed,
    [styles.draggedOver]: strategyPhase.swapCards.isBeingPlayed && draggedOver,
  });

  // ======== RENDER COMPONENT =================================================

  if (isDragging) return <CardPlaceholder />;

  return (
    <div className={cardContainerClasses}>
      {choosePlayerAction.playable && !choosePlayerAction.isBeingPlayed && (
        <SpeakerButton handleClick={handleClick} />
      )}

      {view === views.actionPhase &&
        !strategyAction.isBeingPlayed &&
        hover &&
        !strategyCard.exhausted && <Tooltip number={strategyCard.id} />}

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
