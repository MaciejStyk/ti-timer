import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useDrop } from "react-dnd";
import { IStrategyCard } from "../../global/strategyCards";
import { IPlayer } from "../../redux/reducers/players";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import useStrategyAction from "../../phases/ActionPhase/hooks/useStrategyAction";
import StrategyCard from "../../components/StrategyCard";
import CardPlaceholder from "../../components/CardPlaceholder";
import views from "../../global/views";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  player?: IPlayer;
  onDrop?: (strategyCard: IStrategyCard) => void;
  moveToAvailableDeck?: (strategyCard: IStrategyCard) => void;
}

const PlayerCardsPanel: FunctionComponent<IProps> = (props) => {
  const { player, onDrop, moveToAvailableDeck } = props;
  const { players, current, strategyPhase } = useSelector(
    (state: RootState) => state
  );
  const { currentPlayerCanPick } = useCurrentPlayer();
  const makeStrategyAction = useStrategyAction();
  const duringSwapCards = strategyPhase.swapCards.isBeingPlayed;

  // ======== DRAG N DROP  =====================================================

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "strategyCard",
    drop: onDrop!,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const showBottomPlaceholder = isOver && currentPlayerCanPick;

  const draggable: (index: number) => boolean = (index) => {
    if (current.view === views.strategyPhase) {
      return (
        strategyPhase.swapCards.isBeingPlayed ||
        index === strategyPhase.round - 1
      );
    } else {
      return false;
    }
  };

  // ======== CLASSES ==========================================================

  const playerDeckClasses = cn({
    [styles.playerDeck]: true,
    [styles.canDrop]: canDrop && (duringSwapCards || currentPlayerCanPick),
    [styles.notDuringSwapCards]: !duringSwapCards,
    [styles.duringSwapCardsWide]: duringSwapCards && players.length < 5,
    [styles.duringSwapCardsNarrow]: duringSwapCards && players.length >= 5,
    [styles.sevenOrEightPlayers]: duringSwapCards && players.length >= 7,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={playerDeckClasses} ref={dropRef}>
      {player?.strategyCards.length === 0 && !isOver && (
        <span>
          Press number, drag <br /> or double click <br /> strategy cards here
        </span>
      )}
      {player?.strategyCards.map((strategyCard, index) => (
        <StrategyCard
          key={strategyCard.id}
          strategyCard={strategyCard}
          moveBetweenDecks={moveToAvailableDeck}
          draggable={draggable(index)}
          makeStrategyAction={makeStrategyAction}
        />
      ))}
      {showBottomPlaceholder && <CardPlaceholder />}
    </div>
  );
};

export default PlayerCardsPanel;
