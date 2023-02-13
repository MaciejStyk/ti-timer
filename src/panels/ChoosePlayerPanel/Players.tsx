import { FunctionComponent } from "react";
import usePlayers from "./hooks/usePlayers";
import PlayerBar from "./PlayerBar";
import styles from "./index.module.css";

const Players: FunctionComponent = () => {
  const playersToChooseFrom = usePlayers();

  return (
    <div className={styles.playerContainer}>
      {playersToChooseFrom.map((player) => (
        <PlayerBar player={player} key={player.id}/>
      ))}
    </div>
  );
};

export default Players;
