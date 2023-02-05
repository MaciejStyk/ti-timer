import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import PlayerName from "./PlayerName";
import PlayerCardsPanel from "../../../panels/PlayerCardsPanel";
import useMove from "../hooks/useMove";
import cn from "classnames";
import styles from "./index.module.css";

const PlayerDecks: FunctionComponent = () => {
  const { players } = useSelector((state: RootState) => state);
  const [swappedCardID, setSwappedCardID] = useState<number | undefined>(
    undefined
  );

  const updateSwappedCardID = (event: any) => {
    if (event.target.tagName === "IMG") {
      setSwappedCardID(+event.target.id);
    } else {
      setSwappedCardID(undefined);
    }
  };

  const move = useMove(swappedCardID);

  const playersContainerClasses = cn({
    [styles.playersContainer]: true,
    [styles.threePlayers]: players.length === 3,
    [styles.fourPlayers]: players.length === 4,
    [styles.fivePlayers]: players.length === 5,
    [styles.sixPlayers]: players.length === 6,
    [styles.sevenPlayers]: players.length === 7,
    [styles.eightPlayers]: players.length === 8,
  });

  return (
    <div className={playersContainerClasses}>
      {players.map((player, index) => (
        <div
          key={player.id}
          className={styles.playerContainer}
          onDragEnter={updateSwappedCardID}
        >
          <PlayerName player={player} />
          <PlayerCardsPanel
            player={player}
            onDrop={(strategyCard) =>
              move.betweenPlayersDeck(strategyCard, index)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default PlayerDecks;
