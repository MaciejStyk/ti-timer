import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import PlayerBar from "./PlayerBar";
import cn from "classnames";
import styles from "./index.module.css";

const LeftPanel: FunctionComponent = () => {
  const { players, strategyAction } = useSelector((state: RootState) => state);
  const [hover, setHover] = useState(false);

  const leftPanelClasses = cn({
    [styles.playersList]: true,
    [styles.playersListNarrow]:
      strategyAction.isBeingPlayed && players.length > 6,
  });

  return (
    <div
      className={leftPanelClasses}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {players.map((player) => (
        <PlayerBar player={player} hover={hover} key={player.id}/>
      ))}
    </div>
  );
};

export default LeftPanel;
