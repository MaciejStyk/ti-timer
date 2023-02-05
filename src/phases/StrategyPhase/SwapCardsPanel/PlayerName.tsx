import { FunctionComponent } from "react";
import { IPlayer } from "../../../redux/reducers/players";
import styles from "./index.module.css";

interface IProps {
  player: IPlayer;
}

const PlayerName: FunctionComponent<IProps> = ({ player }) => {
  return (
    <div
      className={styles.playerName}
      style={{
        color: player.theme.backgroundColor,
        textShadow:
          player.theme.backgroundColor === "#000000" ? "1px 1px 1vh white" : "",
      }}
    >
      {player.name}
    </div>
  );
};

export default PlayerName;
