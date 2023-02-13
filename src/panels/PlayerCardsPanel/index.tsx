import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IStrategyCard } from "../../global/strategyCards";
import { IPlayer } from "../../redux/reducers/players";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import StrategyCard from "../../components/StrategyCard";
import CardPlaceholder from "../../components/CardPlaceholder";
import useMove from "../../phases/StrategyPhase/hooks/useMove";
import useDnD from "../../hooks/useDnD";
import Info from "./Info";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  player: IPlayer;
  onDrop?: (strategyCard: IStrategyCard) => void;
}

const PlayerCardsPanel: FunctionComponent<IProps> = (props) => {
  const { player, onDrop } = props;
  const { players, strategyPhase } = useSelector((state: RootState) => state);
  const duringSwapCards = strategyPhase.swapCards.isBeingPlayed;

  const move = useMove();
  const { currentPlayerCanPick } = useCurrentPlayer();
  const { dropRef, isOver, canDrop, draggable } = useDnD(onDrop!);
  const showPlaceholder = isOver && currentPlayerCanPick;

  const playerDeckClasses = cn({
    [styles.playerDeck]: true,
    [styles.canDrop]: canDrop && (duringSwapCards || currentPlayerCanPick),
    [styles.notDuringSwapCards]: !duringSwapCards,
    [styles.duringSwapCardsWide]: duringSwapCards && players.length < 5,
    [styles.duringSwapCardsNarrow]: duringSwapCards && players.length >= 5,
    [styles.sevenOrEightPlayers]: duringSwapCards && players.length >= 7,
  });

  return (
    <div className={playerDeckClasses} ref={dropRef}>
      <Info player={player} isOver={isOver} />
      {player.strategyCards.map((strategyCard, index) => (
        <StrategyCard
          key={strategyCard.id}
          strategyCard={strategyCard}
          draggable={draggable(index)}
          moveBetweenDecks={move.toAvailableDeck}
        />
      ))}
      {showPlaceholder && <CardPlaceholder />}
    </div>
  );
};

export default PlayerCardsPanel;
