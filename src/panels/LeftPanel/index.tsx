import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import RenderTime from "../../components/RenderTime";
import cn from "classnames";
import styles from "./index.module.css";

const LeftPanel: FunctionComponent = () => {
  const { players, playerIndex, strategyAction } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];

  const [hover, setHover] = useState(false);

  // ======== CLASSES ==========================================================

  const leftPanelClasses = cn({
    [styles.playersList]: true,
    [styles.playersListNarrow]:
      strategyAction.isBeingPlayed && players.length > 6,
  });

  const playerBarContentClasses = cn({
    [styles.playerBarContent]: true,
    [styles.lowercase]: hover,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div
      className={leftPanelClasses}
      onMouseEnter={() => setHover((prevState) => !prevState)}
      onMouseLeave={() => setHover((prevState) => !prevState)}
    >
      {players.map((player) => (
        <div
          key={player.id}
          style={player.theme}
          className={cn({
            [styles.playerBar]: true,
            [styles.narrow]: strategyAction.isBeingPlayed && players.length > 6,
            [styles.active]: player.id === currentPlayer.id,
            [styles.passed]: !strategyAction.isBeingPlayed && player.passed,
          })}
        >
          <div className={playerBarContentClasses}>
            {hover ? (
              <RenderTime
                time={player.timeBank.min * 60 + player.timeBank.sec}
              />
            ) : (
              player.name
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
