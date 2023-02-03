import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPlayer } from "../../redux/reducers/players";
import useCurrentPlayer from "../../hooks/useCurrentPlayer";
import PlayerBarContent from "./PlayerBarContent";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  player: IPlayer;
  hover: boolean;
}

const PlayerBar: FunctionComponent<IProps> = (props) => {
  const { player } = props;
  const { players, strategyAction } = useSelector((state: RootState) => state);
  const { currentPlayer } = useCurrentPlayer();

  return (
    <div
      key={player.id}
      style={player.theme}
      className={cn({
        [styles.playerBar]: true,
        [styles.narrow]: strategyAction.isBeingPlayed && players.length > 6,
        [styles.active]: player.id === currentPlayer?.id,
        [styles.passed]: !strategyAction.isBeingPlayed && player.passed,
      })}
    >
      <PlayerBarContent {...props} />
    </div>
  );
};

export default PlayerBar;
