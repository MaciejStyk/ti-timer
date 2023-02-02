import { FunctionComponent } from "react";
import { IPlayer } from "../../redux/players";
import RenderTime from "../../components/RenderTime";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  player: IPlayer;
  hover: boolean;
}

const PlayerBarContent: FunctionComponent<IProps> = (props) => {
  const { player, hover } = props;

  const playerBarContentClasses = cn({
    [styles.playerBarContent]: true,
    [styles.lowercase]: hover,
  });

  return (
    <div className={playerBarContentClasses}>
      {hover ? (
        <RenderTime time={player.timeBank.min * 60 + player.timeBank.sec} />
      ) : (
        player.name
      )}
    </div>
  );
};

export default PlayerBarContent;
