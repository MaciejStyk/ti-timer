import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import cn from "classnames";
import styles from "./index.module.css";

const PlayerName: FunctionComponent = () => {
  const { strategyAction } = useSelector((state: RootState) => state);
  const { currentPlayer } = useCurrentPlayer();

  const playerNameClasses = cn({
    [styles.playerName]: true,
    [styles.playerNameStrategyAction]: strategyAction.isBeingPlayed,
  });

  return <div className={playerNameClasses}>{currentPlayer?.name}</div>;
};

export default PlayerName;
