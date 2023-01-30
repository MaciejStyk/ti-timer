import { FunctionComponent, Fragment } from "react";
import { useDrop } from "react-dnd";
import StrategyCard from "../StrategyCard";
import CardPlaceholder from "../CardPlaceholder";
import { IStrategyCard } from "../../global/strategyCards";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IMove } from "../../types";
import cn from "classnames";
import styles from "./index.module.css";

interface IAvailableDeck {
move: IMove;
  currentPlayerCanPick: boolean;
}

const AvailableDeck: FunctionComponent<IAvailableDeck> = (props) => {
  const { move, currentPlayerCanPick } =
    props;
  const { strategyPhase } = useSelector((state: RootState) => state);

  // ======== DRAG N DROP  =====================================================

  const [{ isOver, draggedCard, canDrop }, dropRefBack] = useDrop({
    accept: "strategyCard",
    drop: (strategyCard: IStrategyCard) => move.toAvailableDeck(strategyCard),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggedCard: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
  });

  const showTopPlaceholder = isOver && !currentPlayerCanPick;

  // ======== CLASSES ==========================================================

  const strategyCardsContainerClasses = cn({
    [styles.strategyCardsContainer]: true,
    [styles.canDrop]: canDrop && !currentPlayerCanPick,
    [styles.strategyCardsContainerNarrow]:
      strategyPhase.availableStrategyCards.length < 3,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={strategyCardsContainerClasses} ref={dropRefBack}>
      {showTopPlaceholder &&
        strategyPhase.availableStrategyCards.length === 0 && (
          <CardPlaceholder />
        )}

      {strategyPhase.availableStrategyCards.map(
        (strategyCard, index, cardsArray) => {
          let showBefore = true;
          let placeholderIndex = 0;
          for (let card of cardsArray) {
            if (draggedCard?.id > card.id) {
              if (!showBefore) placeholderIndex++;
              if (showBefore) showBefore = false;
            }
          }
          return (
            <Fragment key={strategyCard.id}>
              {showTopPlaceholder &&
                showBefore &&
                index === placeholderIndex && <CardPlaceholder />}
              <StrategyCard
                strategyCard={strategyCard}
                moveBetweenDecks={move.toPlayersDeck}
                draggable={currentPlayerCanPick}
              />
              {showTopPlaceholder &&
                !showBefore &&
                index === placeholderIndex && <CardPlaceholder />}
            </Fragment>
          );
        }
      )}
    </div>
  );
};

export default AvailableDeck;
