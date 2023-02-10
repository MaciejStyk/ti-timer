import { FunctionComponent, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IMove } from "../../../types";
import useCurrentPlayer from "../../../hooks/useCurrentPlayer";
import useAvailableDnD from "../hooks/useAvailableDnD";
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
  const { dropRef, canDrop, draggedCard, showPlaceholder } = useAvailableDnD(move);

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
                moveBetweenDecks={move.toPlayersDeck}
                draggable={currentPlayerCanPick}
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
