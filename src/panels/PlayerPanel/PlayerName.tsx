import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import cn from "classnames";
import styles from "./index.module.css";

const PlayerName: FunctionComponent = () => {
  const { players, playerIndex, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];

  const playerNameClasses = cn({
    [styles.playerName]: true,
    [styles.playerNameStrategyAction]: strategyAction.isBeingPlayed,
  });

  return <div className={playerNameClasses}>{currentPlayer.name}</div>;
};

export default PlayerName;
