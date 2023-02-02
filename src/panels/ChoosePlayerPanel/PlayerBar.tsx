import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { chooseInChoosePlayerAction } from "../../redux/choosePlayerAction";
import { IPlayer } from "../../redux/players";
import themes from "../../global/themes";
import cn from "classnames";
import styles from "./index.module.css";

interface IProps {
  player: IPlayer;
}

const PlayerBar: FunctionComponent<IProps> = ({ player }) => {
  const { players, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  return (
    <div
      key={player.id}
      style={player.theme}
      className={cn({
        [styles.playerBar]: true,
        [styles.oneColumn]: players.length < 5,
        [styles.twoColumns]: players.length >= 5,
        [styles.chosen]: player.id === chosenPlayer?.id,
        [styles.whiteShadow]:
          player.theme.backgroundColor === themes[6].backgroundColor,
      })}
      onClick={() => dispatch(chooseInChoosePlayerAction(player))}
    >
      <div className={styles.playerBarContent}>{player.name}</div>
    </div>
  );
};

export default PlayerBar;
