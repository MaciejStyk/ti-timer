import { FunctionComponent, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IStrategyCard } from "../../../global/strategyCards";
import useMove from "../hooks/useMove";
import useDnD from "../../../hooks/useDnD";
import useCurrentPlayer from "../../../hooks/useCurrentPlayer";
import StrategyCard from "../../../components/StrategyCard";
import CardPlaceholder from "../../../components/CardPlaceholder";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  onDrop: (strategyCard: IStrategyCard) => void;
}

const AvailableCardsPanel: FunctionComponent<IProps> = (props) => {
  const { onDrop } = props;
  const { strategyPhase } = useSelector((state: RootState) => state);
  const { currentPlayerCanPick } = useCurrentPlayer();
  const { dropRef, isOver, canDrop, draggedCard } = useDnD(onDrop);
  const showPlaceholder = isOver && !currentPlayerCanPick;
  const move = useMove();

  const strategyCardsContainerClasses = cn({
    [styles.strategyCardsContainer]: true,
    [styles.canDrop]: canDrop && !currentPlayerCanPick,
    [styles.strategyCardsContainerNarrow]:
      strategyPhase.availableStrategyCards.length < 3,
  });

  return (
    <div className={strategyCardsContainerClasses} ref={dropRef}>
      {showPlaceholder && strategyPhase.availableStrategyCards.length === 0 && (
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
              {showPlaceholder && showBefore && index === placeholderIndex && (
                <CardPlaceholder />
              )}
              <StrategyCard
                strategyCard={strategyCard}
                draggable={currentPlayerCanPick}
                moveBetweenDecks={move.toPlayersDeck}
              />
              {showPlaceholder && !showBefore && index === placeholderIndex && (
                <CardPlaceholder />
              )}
            </Fragment>
          );
        }
      )}
    </div>
  );
};

export default AvailableCardsPanel;
