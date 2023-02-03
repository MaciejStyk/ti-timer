import { FunctionComponent, Fragment } from "react";
import { useDrop } from "react-dnd";
import { IStrategyCard } from "../../../global/strategyCards";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IMove } from "../../../types";
import useCurrentPlayer from "../../../hooks/useCurrentPlayer";
import StrategyCard from "../../../components/StrategyCard";
import CardPlaceholder from "../../../components/CardPlaceholder";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  move: IMove;
}

const AvailableCardsPanel: FunctionComponent<IProps> = (props) => {
  const { move } = props;
  const { strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayerCanPick } = useCurrentPlayer();

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

export default AvailableCardsPanel;
